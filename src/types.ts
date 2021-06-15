export type TCellType = 'text' | 'link' | 'progress'

export type TCellData = {
  span?: number
  id?: string
  type?: TCellType
  styles?: string[]
  value: string | number
  rowResizeId?: string
  styleAttribute?: string
}

export type TTableResize = {
  columns: Record<string, number>
  rows: Record<string, number>
}

export type TMouseEventCallback = ({}: { row: number; column: number; event: MouseEvent }) => void

export type TTableCallbacks = {
  onCellClick?: TMouseEventCallback
  onContextMenu?: TMouseEventCallback
  onMouseOver?: TMouseEventCallback
  onMouseOut?: TMouseEventCallback
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
