import { html } from 'uhtml'

import { TTableData } from '../types'
import { TCellClasses, TRenderMeta } from './cell'
import styles from './content.module.css'
import { TableRow } from './row'

function TableContent(
  key: object,
  start: number,
  { values: table, headRowsCount, dataHeadColumnsCount }: TTableData,
  cellClasses: TCellClasses,
  stickySide: boolean,
  mergeCells: boolean,
  onCellClick?: ({}: { row: number; column: number }) => void
) {
  const meta: TRenderMeta = {}

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
      ${table.map((row, index) => {
        const rowIndex = start + index

        return TableRow({
          key,
          row,
          rowIndex,
          dataHeadColumnsCount,
          cell: {
            isRowHeader: headRowsCount > rowIndex,
            meta,
            cellClasses,
            stickySide,
            mergeCells,
          },
        })
      })}
    </table>
  `
}

export { TableContent }
