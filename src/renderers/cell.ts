import { Hole, html } from 'uhtml'

import { ITableController } from '../model'
import { TCellData, TCellType, TTableCallbacks, TTableResize } from '../types'
import { Signal } from '../utils/signal'
import { startDrag } from '../utils/startDrag'
import styles from './cell.module.css'
import { CollapseIcon } from './cellContent/collapseIcon'
import { TableCellLink } from './cellContent/link'
import { TableCellProgress } from './cellContent/progress'
import { TableCellText } from './cellContent/text'
import { TCellContentRenderer } from './cellContent/types'

export type TResizeInfo =
  | {
      state: 'preview'
      size: number
    }
  | {
      state: 'end'
    }
export type TRenderMeta = { [row: number]: { [column: number]: boolean } }
export type TCellClasses = {
  [key: string]: string
}

export type TCellProps = {
  data: TCellData
  resize: TTableResize
  columnsOrder: string[]
  callbacks: TTableCallbacks
  controller: ITableController
  rowIndex: number
  columnIndex: number
  isRowHeader: boolean
  isColumnHeader: boolean
  meta: TRenderMeta
  cellClasses: TCellClasses
  stickySide: boolean
  mergeCells: boolean
  leftOffset: number
  defaultLinesCount: number
}

const renderers: Record<TCellType, TCellContentRenderer> = {
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
  resize,
  columnsOrder,
  callbacks,
  leftOffset,
  defaultLinesCount,
  controller,
}: TCellProps) {
  if (meta[rowIndex]?.[columnIndex]) {
    return []
  }

  const isHeader = isColumnHeader || isRowHeader
  const colSpan = isRowHeader && mergeCells ? data?.span : undefined
  const rowSpan = isColumnHeader && mergeCells ? data?.span : undefined
  const columnResizeId = columnsOrder?.[columnIndex]
  const showCollapseIcon = controller.hasCollapseIcon(rowIndex, columnIndex)

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

  let style = data.styleAttribute || ''

  if (stickySide && isColumnHeader) {
    style += `;left: ${leftOffset}px; z-index: 1`
  }

  const styleNames = [isHeader ? 'header' : 'body']

  if (data.styles) {
    styleNames.push(...data.styles)
  }

  const cellClassName = styleNames
    .map((style) => cellClasses[style])
    .filter((className) => className != null)
    .join(' ')

  const CellContent = renderers[data.type || 'text']
  const resizeSignal = new Signal<TResizeInfo>()
  const { onRowResize, onColumnResize } = callbacks
  const collapsed = controller.isCollapsed(rowIndex, columnIndex)

  return html`<td
    class=${`${styles.cell} ${cellClassName}`}
    colspan=${colSpan}
    rowspan=${rowSpan}
    style=${style}
    .dataset=${{ column: columnIndex, row: rowIndex }}
  >
    <div class=${styles.cellContainer}>
      ${showCollapseIcon
        ? CollapseIcon({
            className: cellClasses['collapse'],
            collapsed,
            onClick: () => controller.setCollapsed({ rowIndex, columnIndex, value: !collapsed }),
          })
        : null}
      ${CellContent({ data, resize, resizeSignal, callbacks, defaultLinesCount })}
    </div>
    ${columnResizeId && (!colSpan || colSpan === 1) && onColumnResize
      ? html`<div
          class=${styles.columnResizer}
          onmousedown=${(e: MouseEvent) => {
            const cellElement = (e.target as HTMLDivElement).parentElement!
            const elementWidth = cellElement?.clientWidth!

            startDrag(e, {
              onDragMove: ({ deltaX }) => {
                cellElement.style.width = `${elementWidth + deltaX}px`
              },
              onDragEnd: ({ deltaX }) => {
                cellElement.style.width = ''
                onColumnResize(columnResizeId, elementWidth + deltaX)
              },
            })
          }}
        ></div>`
      : null}
    ${data.rowResizeId && onRowResize
      ? html`<div
          class=${styles.rowResizer}
          onmousedown=${(e: MouseEvent) => {
            const cellElement = (e.target as HTMLDivElement).parentElement!
            const cellStyle = getComputedStyle(cellElement)
            const padding = parseInt(cellStyle.paddingTop) + parseInt(cellStyle.paddingBottom)

            const elementHeight = cellElement?.clientHeight!
            const contentHeight = elementHeight - padding

            startDrag(e, {
              onDragMove: ({ deltaY }) => {
                cellElement.style.height = `${elementHeight + deltaY}px`
                resizeSignal.dispatch({
                  state: 'preview',
                  size: contentHeight + deltaY,
                })
              },
              onDragEnd: () => {
                cellElement.style.height = ''
                resizeSignal.dispatch({
                  state: 'end',
                })
              },
            })
          }}
        ></div>`
      : null}
  </td>`
}

export { TableCell }
