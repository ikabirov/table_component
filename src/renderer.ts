import { html, render } from 'uhtml'
import { TCellData, TTableData } from './types'

type TRenderMeta = { [row: number]: { [column: number]: boolean } }

const CELL_WIDTH = 150

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

  return html`<td
    colspan=${colSpan}
    rowspan=${rowSpan}
    style=${`font-weight: bold; position: ${isColumnHeader ? 'sticky' : 'static'}; left: ${
      columnIndex * CELL_WIDTH
    }px; width: 150px`}
  >
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

function Table({ table, target }: { table: TTableData; target: HTMLElement }) {
  const meta: TRenderMeta = {}

  let start = 0
  let count = 5

  function redraw() {
    render(
      target,
      TableRenderer({
        values: table.values.slice(start, start + count),
        dataHeadColumnsCount: table.dataHeadColumnsCount,
        headRowsCount: table.headRowsCount - start,
      })
    )
  }

  redraw()

  setInterval(() => {
    ++start
    redraw()
  }, 1000)

  redraw()
}

export { Table }
