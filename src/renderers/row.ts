import { html } from 'uhtml'

import { TCellData } from '../types'
import { TableCell, TCellProps } from './cell'

function TableRow({
  key,
  row,
  rowIndex,
  dataHeadColumnsCount,
  cell,
  columnsLeft,
}: {
  key: object
  row: TCellData[]
  rowIndex: number
  dataHeadColumnsCount: number
  cell: Omit<TCellProps, 'data' | 'rowIndex' | 'columnIndex' | 'isColumnHeader' | 'leftOffset'>
  columnsLeft: number[]
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
        leftOffset: columnsLeft[columnIndex]!,
      })
    )}
  </tr>`
}

export { TableRow }
