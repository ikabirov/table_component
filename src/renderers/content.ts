import { html } from 'uhtml'

import { TTableCallbacks, TTableData, TTableResize } from '../types'
import { TCellClasses, TRenderMeta } from './cell'
import styles from './content.module.css'
import { TableRow } from './row'

const DEFAULT_LINES_COUNT = 2
const DEFAULT_CELL_WIDTH = 150

function TableContent(
  key: object,
  start: number,
  { values: table, headRowsCount, dataHeadColumnsCount, columnsOrder }: TTableData,
  cellClasses: TCellClasses,
  stickySide: boolean,
  mergeCells: boolean,
  resize: TTableResize,
  callbacks: TTableCallbacks,
  defaultLinesCount: number = DEFAULT_LINES_COUNT
) {
  const meta: TRenderMeta = {}
  const onCellClick = callbacks.onCellClick

  let columnsLeft: number[] = [0]

  return html`
    <table
      class=${styles.table}
      onclick=${onCellClick
        ? (e: MouseEvent) => {
            let target = e.target as HTMLElement | null

            while (target && target.tagName !== 'TD' && target !== e.currentTarget) {
              target = target.parentElement
            }

            const { column: columnString, row: rowString } = target?.dataset || {}

            if (columnString && rowString) {
              const column = parseInt(columnString, 10)
              const row = parseInt(rowString, 10)

              onCellClick({ row, column })
            }
          }
        : null}
    >
      ${columnsOrder.map((columnId, index) => {
        const width = resize.columns[columnId] || DEFAULT_CELL_WIDTH

        columnsLeft[index + 1] = columnsLeft[index]! + width

        return html`<col width=${width} />`
      })}
      ${table.map((row, index) => {
        const rowIndex = start + index

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
          },
        })
      })}
    </table>
  `
}

export { TableContent }
