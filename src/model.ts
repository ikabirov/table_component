import { TTableData } from './types'

export type TVisibleTableData = TTableData & {
  offset: number
  startRowIndex: number
  stickyRows: TTableData['values']
}

class TableModel {
  private data: TTableData
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
    stickyRows: [],
  }

  public scrollPosition: number = 0

  public get contentHeight() {
    return this.rowHeights.reduce((acc, current) => acc + current, 0) + 1
  }

  public get visibleTableData(): TVisibleTableData {
    return this.lastDataSnapshot
  }

  constructor(data: TTableData, onChange: () => void, minRowHeight: number) {
    this.data = data
    this.rowHeights = new Array(data.values.length).fill(minRowHeight)
    this.onChange = onChange
  }

  private getRowInfo(index: number) {
    const span = this.data.values[index][0].span || 1
    const height = this.rowHeights.slice(index, index + span).reduce((acc, value) => acc + value, 0)

    return {
      span,
      height,
    }
  }

  private commit() {
    let offset = 0
    let start = this.data.headRowsCount
    let height = 0

    const visibleHeight =
      this.areaHeight -
      this.rowHeights.slice(0, this.data.headRowsCount).reduce((acc, value) => acc + value, 0)
    const top = Math.max(0, this.scrollPosition - this.additionalArea)
    const bottom = this.scrollPosition + visibleHeight + this.additionalArea

    let rowInfo = this.getRowInfo(start)
    while (rowInfo.height + offset < top) {
      offset += rowInfo.height
      start += rowInfo.span

      rowInfo = this.getRowInfo(start)
    }

    let end = start + 1
    while (height + offset + this.rowHeights[end] < bottom) {
      height += this.rowHeights[end]
      ++end
    }

    if (
      this.lastDataSnapshot.startRowIndex !== start ||
      this.lastDataSnapshot.values.length + this.lastDataSnapshot.startRowIndex !== end
    ) {
      this.lastDataSnapshot = {
        startRowIndex: start,
        offset,
        dataHeadColumnsCount: this.data.dataHeadColumnsCount,
        headRowsCount: 0,
        values: this.data.values.slice(start, end),
        stickyRows: this.data.values.slice(0, this.data.headRowsCount),
      }

      this.onChange()
    }
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
}

export { TableModel }
