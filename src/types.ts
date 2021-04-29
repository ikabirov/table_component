export type TCellType = 'text' | 'link' | 'progress'

export type TCellData = {
  span?: number
  id?: string
  type?: TCellType
  styles?: string[]
  value: string | number
}

export type TTableData = {
  values: TCellData[][]
  headRowsCount: number
  dataHeadColumnsCount: number
}
