export type TCellType = 'text' | 'link' | 'progress'

export type TCellData = {
  span?: number
  id?: string
  type?: TCellType
  styles?: string[]
  value: string | number
  rowResizeId?: string
}

export type TTableResize = {
  columns: Record<string, number>
  rows: Record<string, number>
}

export type TTableCallbacks = {
  onCellClick?: ({}: { row: number; column: number }) => void
  onRowResize?: (id: string, linesCount: number) => void
  onColumnResize?: (id: string, width: number) => void
}

export type TTableData = {
  values: TCellData[][]
  headRowsCount: number
  dataHeadColumnsCount: number
  columnsOrder: string[]
  resize?: TTableResize
}
