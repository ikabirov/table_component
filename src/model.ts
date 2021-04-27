import { TTableData } from './types'

export type TVisibleTableData = TTableData & {
  offset: number
  startRowIndex: number
  headerRows: TTableData['values'] | null
}

class TableModel {
  private containerElement: HTMLElement | null = null
  private resizeObserver: ResizeObserver
  private data: TTableData
  private stickyHeader: boolean
  private mergeCells: boolean
  private rowHeights: number[]
  private areaHeight: number = 0
  private additionalArea: number = 0
  private onChange: () => void

  private lastDataSnapshot: TVisibleTableData = {
    dataHeadColumnsCount: 0,
    headRowsCount: 0,
    offset: 0,
    startRowIndex: 0,
    values: [],
    headerRows: [],
  }

  public scrollPosition: number = 0

  public get contentHeight() {
    return this.rowHeights.reduce((acc, current) => acc + current, 0) + 1
  }

  public get visibleTableData(): TVisibleTableData {
    return this.lastDataSnapshot
  }

  constructor({
    data,
    onChange,
    minRowHeight,
    stickyHeader,
    mergeCells,
  }: {
    data: TTableData
    onChange: () => void
    minRowHeight: number
    stickyHeader: boolean
    mergeCells: boolean
  }) {
    this.data = data
    this.rowHeights = new Array(data.values.length).fill(minRowHeight)
    this.onChange = onChange
    this.stickyHeader = stickyHeader
    this.mergeCells = mergeCells

    this.resizeObserver = new ResizeObserver(() => {
      if (this.containerElement) {
        this.setAreaHeight(
          this.containerElement.clientHeight,
          this.containerElement.clientHeight * 0.5
        )
      }
    })
  }

  private getRowInfo(index: number): { span: number; height: number } {
    if (!this.mergeCells) {
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

  private commit() {
    let offset = 0
    let start = 0
    let visibleHeight = this.areaHeight
    let height = 0

    if (this.stickyHeader) {
      start = this.data.headRowsCount
      visibleHeight -= this.rowHeights.slice(0, start).reduce((acc, value) => acc + value, 0)
    }

    const top = Math.max(0, this.scrollPosition - this.additionalArea)
    const bottom = this.scrollPosition + visibleHeight + this.additionalArea

    let rowInfo = this.getRowInfo(start)
    while (rowInfo.height + offset < top) {
      offset += rowInfo.height
      start += rowInfo.span

      rowInfo = this.getRowInfo(start)
    }

    let end = start
    rowInfo = this.getRowInfo(end)

    while (height + offset < bottom && end < this.data.values.length) {
      height += rowInfo.height
      end += rowInfo.span
      rowInfo = this.getRowInfo(end)
    }

    if (
      this.lastDataSnapshot.startRowIndex !== start ||
      this.lastDataSnapshot.values.length + this.lastDataSnapshot.startRowIndex !== end
    ) {
      this.lastDataSnapshot = {
        startRowIndex: start,
        offset,
        dataHeadColumnsCount: this.data.dataHeadColumnsCount,
        headRowsCount: this.stickyHeader ? 0 : this.data.headRowsCount,
        values: this.data.values.slice(start, end),
        headerRows: this.stickyHeader ? this.data.values.slice(0, this.data.headRowsCount) : null,
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
    return this.data === data
  }

  public setScrollPosition = (value: number) => {
    if (this.scrollPosition !== value) {
      this.scrollPosition = value
      this.commit()
    }
  }

  public setAreaHeight = (height: number, additionalAreaHeight: number) => {
    this.areaHeight = height
    this.additionalArea = additionalAreaHeight

    this.commit()
  }

  public setRowHeights(start: number, values: number[]) {
    this.rowHeights.splice(start, values.length, ...values)
  }

  public dispose() {
    this.resizeObserver.disconnect()
  }
}

export { TableModel }
