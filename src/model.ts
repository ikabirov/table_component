import deepEqual from 'fast-deep-equal'

import { TCellData, TTableData } from './types'

export type TVisibleTableData = TTableData & {
  offset: number
  startRowIndex: number
  headerRows: TTableData['values'] | null
  contentHeight: number
  hiddenRows: number[]
}

export interface ITableController {
  setCollapsed: ({}: { rowIndex: number; columnIndex: number; value: boolean }) => void
  isCollapsed: (row: number, column: number) => boolean
  hasCollapseIcon: (row: number, column: number) => boolean
}

class TableModel implements ITableController {
  private containerElement: HTMLElement | null = null
  private resizeObserver: ResizeObserver
  private data: TTableData
  private stickyHeader: boolean
  private mergeCells: boolean
  private rowHeights: number[]
  private areaHeight: number = 0
  private additionalArea: number = 0
  private onChange: () => void
  private showCollapseIcons: boolean
  private collapseData: Record<string, boolean> = {}
  private collapseHeaders: number[][] = []

  private lastDataSnapshot: TVisibleTableData = {
    dataHeadColumnsCount: 0,
    headRowsCount: 0,
    offset: 0,
    startRowIndex: 0,
    values: [],
    headerRows: [],
    columnsOrder: [],
    contentHeight: 0,
    hiddenRows: [],
  }

  public scrollTop: number = 0
  public scrollLeft: number = 0

  private getContentHeight(hiddenRows: number[]) {
    return (
      this.rowHeights.reduce((acc, current, index) => {
        if (hiddenRows.includes(index)) {
          return acc
        }

        return acc + current
      }, 0) + 1
    )
  }

  public get visibleTableData(): TVisibleTableData {
    return this.lastDataSnapshot
  }

  private get hiddenRows() {
    const res: number[] = []

    for (const collapseKey of Object.keys(this.collapseData)) {
      const [rowString, columnString] = collapseKey.split(':')

      if (rowString && columnString) {
        const row = parseInt(rowString, 10)
        const column = parseInt(columnString, 10)

        const span = this.data.values[row]?.[column]?.span

        if (span) {
          for (let i = 1; i < span; ++i) {
            res.push(row + i)
          }
        }
      }
    }

    return res
  }

  constructor({
    data,
    onChange,
    minRowHeight,
    stickyHeader,
    mergeCells,
    showCollapseIcons = false,
  }: {
    data: TTableData
    onChange: () => void
    minRowHeight: number
    stickyHeader: boolean
    mergeCells: boolean
    showCollapseIcons?: boolean
  }) {
    this.data = data
    this.rowHeights = new Array(data.values.length).fill(minRowHeight)
    this.onChange = onChange
    this.stickyHeader = stickyHeader
    this.mergeCells = mergeCells
    this.showCollapseIcons = showCollapseIcons

    if (showCollapseIcons && mergeCells) {
      for (let i = 0; i < data.dataHeadColumnsCount - 1; ++i) {
        this.collapseHeaders.push(this.getCellsWithCollapse(i))
      }
    }

    this.resizeObserver = new ResizeObserver(() => {
      if (this.containerElement) {
        this.setAreaHeight(
          this.containerElement.clientHeight,
          this.containerElement.clientHeight * 0.5
        )
      }
    })
  }

  private getCellsWithCollapse(columnIndex: number) {
    const res: number[] = []
    const values = this.data.values

    for (let i = 0; i < values.length; ++i) {
      const cell = values[i]?.[columnIndex]!

      if (cell.span && cell.span > 1) {
        res.push(i)
        i += cell.span - 1
      }
    }

    return res
  }

  private getRowInfo(index: number, hiddenRows: number[]): { span: number; height: number } {
    if (hiddenRows.includes(index)) {
      return {
        span: 1,
        height: 0,
      }
    }

    if (!this.mergeCells || hiddenRows.includes(index + 1)) {
      return {
        span: 1,
        height: this.rowHeights[index]!,
      }
    }

    const firstCell = this.data.values[index]?.[0]

    if (!firstCell) {
      return {
        span: 0,
        height: 0,
      }
    }

    const span = firstCell.span || 1
    const height = this.rowHeights.slice(index, index + span).reduce((acc, value) => acc + value, 0)

    return {
      span,
      height,
    }
  }

  private commit(force: boolean = false) {
    let offset = 0
    let start = 0
    let visibleHeight = this.areaHeight
    let height = 0

    const hiddenRows = this.hiddenRows
    const contentHeight = this.getContentHeight(hiddenRows)

    if (this.stickyHeader) {
      start = this.data.headRowsCount
      visibleHeight -= this.rowHeights.slice(0, start).reduce((acc, value) => acc + value, 0)
    }

    const top = Math.max(0, this.scrollTop - this.additionalArea)
    const bottom = this.scrollTop + visibleHeight + this.additionalArea

    let rowInfo = this.getRowInfo(start, hiddenRows)

    while (rowInfo.height + offset < top) {
      offset += rowInfo.height
      start += rowInfo.span

      rowInfo = this.getRowInfo(start, hiddenRows)
    }

    let end = start

    rowInfo = this.getRowInfo(end, hiddenRows)

    while (height + offset < bottom && end < this.data.values.length) {
      height += rowInfo.height
      end += rowInfo.span
      rowInfo = this.getRowInfo(end, hiddenRows)
    }

    if (
      force ||
      this.lastDataSnapshot.startRowIndex !== start ||
      this.lastDataSnapshot.values.length + this.lastDataSnapshot.startRowIndex !== end ||
      this.lastDataSnapshot.contentHeight !== contentHeight
    ) {
      this.lastDataSnapshot = {
        startRowIndex: start,
        offset,
        dataHeadColumnsCount: this.data.dataHeadColumnsCount,
        headRowsCount: this.stickyHeader ? 0 : this.data.headRowsCount,
        values: this.data.values.slice(start, end),
        headerRows: this.stickyHeader ? this.data.values.slice(0, this.data.headRowsCount) : null,
        columnsOrder: this.data.columnsOrder,
        contentHeight,
        hiddenRows,
      }
      this.onChange()
    }
  }

  public setContainerElement = (value: HTMLElement) => {
    if (this.containerElement !== value) {
      if (this.containerElement) {
        this.resizeObserver.unobserve(value)
      }

      this.containerElement = value
      this.resizeObserver.observe(value)
    }
  }

  public containSameData(data: TTableData) {
    return deepEqual(this.data, data)
  }

  public setScrollPosition = (top: number, left: number) => {
    this.scrollLeft = left

    if (this.scrollTop !== top) {
      this.scrollTop = top
      this.commit()
    }
  }

  public setAreaHeight = (height: number, additionalAreaHeight: number) => {
    this.areaHeight = height
    this.additionalArea = additionalAreaHeight

    this.commit()
  }

  public setRowHeights(start: number, values: number[]) {
    for (let i = 0; i < values.length; ++i) {
      const value = values[i]!

      if (value) {
        this.rowHeights[start + i] = value
      }
    }
  }

  private getCollapseKey = (rowIndex: number, columnIndex: number) => {
    return `${rowIndex}:${columnIndex}`
  }

  public isCollapsed: ITableController['isCollapsed'] = (rowIndex, columnIndex) => {
    return !!this.collapseData[this.getCollapseKey(rowIndex, columnIndex)]
  }

  public hasCollapseIcon: ITableController['hasCollapseIcon'] = (rowIndex, columnIndex) => {
    if (!this.showCollapseIcons || columnIndex >= this.data.dataHeadColumnsCount) {
      return false
    }

    if (rowIndex === this.data.headRowsCount - 1) {
      return !!this.collapseHeaders[columnIndex]?.length
    }

    const rowSpan = this.data.values[rowIndex]?.[columnIndex]?.span

    return !!rowSpan && rowSpan > 1
  }

  private setCollapsedImpl: ITableController['setCollapsed'] = ({
    rowIndex,
    columnIndex,
    value,
  }) => {
    if (rowIndex === this.data.headRowsCount - 1) {
      const cells = this.collapseHeaders[columnIndex]

      if (cells) {
        cells.forEach((row) => {
          this.setCollapsedImpl({ rowIndex: row, columnIndex, value })
        })
      }
    }

    const collapseKey = this.getCollapseKey(rowIndex, columnIndex)

    if (value) {
      this.collapseData[collapseKey] = true
    } else {
      delete this.collapseData[collapseKey]
    }

    this.commit()
  }

  public setCollapsed: ITableController['setCollapsed'] = ({ rowIndex, columnIndex, value }) => {
    this.setCollapsedImpl({ rowIndex, columnIndex, value })

    this.commit(true)
  }

  public dispose() {
    this.resizeObserver.disconnect()
  }
}

export { TableModel }
