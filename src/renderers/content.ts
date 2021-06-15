import { html } from 'uhtml'

import { ITableController } from '../model'
import { TMouseEventCallback, TTableCallbacks, TTableData, TTableResize } from '../types'
import { TCellClasses, TRenderMeta } from './cell'
import styles from './content.module.css'
import { TableRow } from './row'

const DEFAULT_LINES_COUNT = 2
const DEFAULT_CELL_WIDTH = 150

function getCellPosition(
  event: MouseEvent
): {
  row: number
  column: number
} | null {
  let target = event.target as HTMLElement | null

  while (target && target.tagName !== 'TD' && target !== event.currentTarget) {
    target = target.parentElement
  }

  const { column: columnString, row: rowString } = target?.dataset || {}

  if (columnString && rowString) {
    const column = parseInt(columnString, 10)
    const row = parseInt(rowString, 10)

    return { row, column }
  }

  return null
}

function createEventProxy(callback?: TMouseEventCallback) {
  if (!callback) {
    return null
  }

  return (event: MouseEvent) => {
    const position = getCellPosition(event)

    if (position) {
      const { row, column } = position

      callback({ row, column, event })
    }
  }
}

function createTooltipEvents({ onMouseOver, onMouseOut }: TTableCallbacks) {
  let current: {
    row: number
    column: number
  } | null = null

  const onMouseOverInternal = onMouseOver
    ? createEventProxy((data) => {
        const { row, column } = data

        if (!current) {
          current = { row, column }

          onMouseOver(data)
        }
      })
    : null

  const onMouseOutInternal = onMouseOut
    ? createEventProxy((data) => {
        if (current) {
          const { row, column } = data

          if (row !== current.row || column !== current.column) {
            onMouseOut({
              ...current,
              event: data.event,
            })
            current = null
          }
        }
      })
    : null

  return {
    mouseOver: onMouseOverInternal,
    mouseOut: onMouseOutInternal,
  }
}

function TableContent({
  key,
  start,
  tableData: { values: table, headRowsCount, dataHeadColumnsCount, columnsOrder },
  cellClasses,
  stickySide,
  mergeCells,
  resize,
  callbacks,
  controller,
  hiddenRows,
  defaultLinesCount = DEFAULT_LINES_COUNT,
}: {
  key: object
  start: number
  tableData: TTableData
  cellClasses: TCellClasses
  stickySide: boolean
  mergeCells: boolean
  resize: TTableResize
  callbacks: TTableCallbacks
  controller: ITableController
  hiddenRows: number[]
  defaultLinesCount?: number
}) {
  const meta: TRenderMeta = {}

  let columnsLeft: number[] = [0]

  const tooltipEvents = createTooltipEvents(callbacks)

  return html`
    <table
      class=${styles.table}
      onclick=${createEventProxy(callbacks.onCellClick)}
      oncontextmenu=${createEventProxy(callbacks.onContextMenu)}
      onmouseover=${tooltipEvents.mouseOver}
      onmouseout=${tooltipEvents.mouseOut}
    >
      ${columnsOrder.map((columnId, index) => {
        const width = resize.columns[columnId] || DEFAULT_CELL_WIDTH

        columnsLeft[index + 1] = columnsLeft[index]! + width

        return html`<col width=${width} />`
      })}
      ${table.map((row, index) => {
        const rowIndex = start + index

        if (hiddenRows.includes(rowIndex)) {
          return html`<tr />`
        }

        return TableRow({
          key,
          row,
          rowIndex,
          dataHeadColumnsCount,
          columnsLeft,
          cell: {
            isRowHeader: headRowsCount > rowIndex,
            meta,
            cellClasses,
            stickySide,
            mergeCells,
            resize,
            callbacks,
            columnsOrder,
            defaultLinesCount,
            controller,
          },
        })
      })}
    </table>
  `
}

export { TableContent }
