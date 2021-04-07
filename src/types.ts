export type TCellData = {
  span?: number
  id?: string
  isLink?: boolean
  styles?: string[]
  value: string | number
}

export type TTableData = {
  values: TCellData[][]
  headRowsCount: number
  dataHeadColumnsCount: number
}
