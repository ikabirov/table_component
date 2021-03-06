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

function createEventProxy(callback?: TMouseEventCallback, allowNull: boolean = false) {
  if (!callback) {
    return null
  }

  return (event: MouseEvent) => {
    const position = getCellPosition(event)

    if (position) {
      const { row, column } = position

      callback({ row, column, event })
    } else if (allowNull) {
      callback({ row: -1, column: -1, event })
    }
  }
}

function createTooltipEvents(
  { onCellMouseOver, onCellMouseOut }: TTableCallbacks,
  controller: ITableController
) {
  if (!onCellMouseOver && !onCellMouseOut) {
    return {
      mouseOver: null,
      mouseOut: null,
    }
  }

  let requestId = 0

  const onMouseOver = createEventProxy((data) => {
    const { hoverCell } = controller
    const { row, column, event } = data

    if (requestId && hoverCell?.column === column && hoverCell?.row === row) {
      cancelAnimationFrame(requestId)
      requestId = 0

      return
    }

    if (!controller.hoverCell) {
      controller.hoverCell = { row, column }

      if (onCellMouseOver) {
        onCellMouseOver(data)
      }
    }
  })

  const onMouseOut = createEventProxy((data) => {
    const { hoverCell } = controller

    if (hoverCell) {
      const { row, column } = data

      if (row === hoverCell.row && column === hoverCell.column) {
        requestId = requestAnimationFrame(() => {
          if (onCellMouseOut) {
            onCellMouseOut({
              ...hoverCell,
              event: data.event,
            })
          }

          controller.hoverCell = null
        })
      }
    }
  }, true)

  return {
    mouseOver: onMouseOver,
    mouseOut: onMouseOut,
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

  const tooltipEvents = createTooltipEvents(callbacks, controller)

  return html`
    <table
      class=${styles.table}
      onclick=${createEventProxy(callbacks.onCellClick)}
      onmousedown=${createEventProxy(callbacks.onCellMouseDown)}
      onmouseup=${createEventProxy(callbacks.onCellMouseUp)}
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
