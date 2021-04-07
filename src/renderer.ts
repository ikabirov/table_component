import { html } from 'uhtml'
import { TCellData, TTableData } from './types'

type TRenderMeta = { [row: number]: { [column: number]: boolean } }

function Cell({
  cell,
  rowIndex,
  columnIndex,
  isRowHeader,
  isColumnHeader,
  meta,
}: {
  cell: TCellData
  rowIndex: number
  columnIndex: number
  isRowHeader: boolean
  isColumnHeader: boolean
  meta: TRenderMeta
}) {
  if (meta[rowIndex]?.[columnIndex]) {
    return []
  }

  const colSpan = isRowHeader ? cell?.span : undefined
  const rowSpan = isColumnHeader ? cell?.span : undefined

  if (colSpan) {
    for (let i = 1; i < colSpan; ++i) {
      meta[rowIndex] = meta[rowIndex] || {}
      meta[rowIndex][columnIndex + i] = true
    }
  }

  if (rowSpan) {
    for (let i = 1; i < rowSpan; ++i) {
      const row = rowIndex + i
      meta[row] = meta[row] || {}
      meta[row][columnIndex] = true
    }
  }

  return html`<td colspan=${colSpan} rowspan=${rowSpan} style=${'font-weight: bold'}>
    ${cell.value}
  </td>`
}

function Row({
  row,
  rowIndex,
  isRowHeader,
  dataHeadColumnsCount,
  meta,
}: {
  row: TCellData[]
  rowIndex: number
  isRowHeader: boolean
  dataHeadColumnsCount: number
  meta: TRenderMeta
}) {
  return html` <tr
    ref=${(node: HTMLTableRowElement) => {
      setTimeout(() => console.log(node.clientHeight))
    }}
  >
    ${row.flatMap((cell, columnIndex) =>
      Cell({
        cell,
        rowIndex,
        columnIndex,
        isRowHeader,
        isColumnHeader: dataHeadColumnsCount > columnIndex,
        meta,
      })
    )}
  </tr>`
}

function TableRenderer({ values: table, headRowsCount, dataHeadColumnsCount }: TTableData) {
  const meta: TRenderMeta = {}

  return html`
    <table>
      ${table.map((row, rowIndex) =>
        Row({ row, rowIndex, isRowHeader: headRowsCount > rowIndex, dataHeadColumnsCount, meta })
      )}
    </table>
  `
}

export { TableRenderer }
