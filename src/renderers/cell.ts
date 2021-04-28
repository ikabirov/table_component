import { html } from 'uhtml'
import { TCellData } from '../types'

import styles from './cell.module.css'
import { TableCellText } from './cellContent/link'
import { TableCellLink } from './cellContent/text'

export type TRenderMeta = { [row: number]: { [column: number]: boolean } }
export type TCellClasses = {
  [key: string]: string
}
export type TCellProps = {
  data: TCellData
  rowIndex: number
  columnIndex: number
  isRowHeader: boolean
  isColumnHeader: boolean
  meta: TRenderMeta
  cellClasses: TCellClasses
  stickySide: boolean
  mergeCells: boolean
}

const CELL_WIDTH = 150

function TableCell({
  data,
  rowIndex,
  columnIndex,
  isRowHeader,
  isColumnHeader,
  meta,
  cellClasses,
  stickySide,
  mergeCells,
}: TCellProps) {
  if (meta[rowIndex]?.[columnIndex]) {
    return []
  }

  const colSpan = isRowHeader && mergeCells ? data?.span : undefined
  const rowSpan = isColumnHeader && mergeCells ? data?.span : undefined

  if (colSpan) {
    for (let i = 1; i < colSpan; ++i) {
      const rowMeta = meta[rowIndex] || {}
      rowMeta[columnIndex + i] = true
      meta[rowIndex] = rowMeta
    }
  }

  if (rowSpan) {
    for (let i = 1; i < rowSpan; ++i) {
      const row = rowIndex + i
      const rowMeta = meta[row] || {}
      rowMeta[columnIndex] = true
      meta[row] = rowMeta
    }
  }

  let style = ''

  if (stickySide) {
    style = `position: ${isColumnHeader ? 'sticky' : 'static'}; left: ${
      columnIndex * CELL_WIDTH
    }px;`
  }

  const styleNames = [isRowHeader || isColumnHeader ? 'header' : 'body']

  if (data.styles) {
    styleNames.push(...data.styles)
  }

  const cellClassName = styleNames
    .map((style) => cellClasses[style])
    .filter((className) => className != null)
    .join(' ')

  const CellContent = data.isLink ? TableCellLink : TableCellText

  return html`<td
    class=${`${styles.cell} ${cellClassName}`}
    colspan=${colSpan}
    rowspan=${rowSpan}
    style=${style}
    .dataset=${{ column: columnIndex, row: rowIndex }}
  >
    <div class=${styles.cellContainer}>
      <div class=${styles.cellContent}>${CellContent(data.value)}</div>
    </div>
  </td>`
}

export { TableCell }
