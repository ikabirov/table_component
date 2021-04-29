import { html } from 'uhtml'

import { TCellData } from '../types'
import { TableCell, TCellProps } from './cell'

function TableRow({
  key,
  row,
  rowIndex,
  dataHeadColumnsCount,
  cell,
}: {
  key: object
  row: TCellData[]
  rowIndex: number
  dataHeadColumnsCount: number
  cell: Omit<TCellProps, 'data' | 'rowIndex' | 'columnIndex' | 'isColumnHeader'>
}) {
  return html.for(key, rowIndex.toString())`<tr
    data-rowIndex=${rowIndex}
  >
    ${row.flatMap((data, columnIndex) =>
      TableCell({
        ...cell,
        data,
        rowIndex,
        columnIndex,
        isColumnHeader: dataHeadColumnsCount > columnIndex,
      })
    )}
  </tr>`
}

export { TableRow }
