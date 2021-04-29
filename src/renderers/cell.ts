import { Hole, html } from 'uhtml'
import { TCellData, TCellType } from '../types'

import styles from './cell.module.css'
import { TableCellText } from './cellContent/text'
import { TableCellLink } from './cellContent/link'
import { TableCellProgress } from './cellContent/progress'

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

const renderers: Record<TCellType, (value: string | number) => Hole | string | number> = {
  text: TableCellText,
  link: TableCellLink,
  progress: TableCellProgress,
}

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
    }px; z-index: 1`
  }

  const styleNames = [isRowHeader || isColumnHeader ? 'header' : 'body']

  if (data.styles) {
    styleNames.push(...data.styles)
  }

  const cellClassName = styleNames
    .map((style) => cellClasses[style])
    .filter((className) => className != null)
    .join(' ')

  const CellContent = renderers[data.type || 'text']

  return html`<td
    class=${`${styles.cell} ${cellClassName}`}
    colspan=${colSpan}
    rowspan=${rowSpan}
    style=${style}
    .dataset=${{ column: columnIndex, row: rowIndex }}
  >
    <div class=${styles.cellContainer}>${CellContent(data.value)}</div>
  </td>`
}

export { TableCell }
