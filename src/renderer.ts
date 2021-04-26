import { html, render, Renderable } from 'uhtml'
import { TableModel } from './model'
import { TCellData, TTableData } from './types'
import styles from './style.module.css'

type TRenderMeta = { [row: number]: { [column: number]: boolean } }
type TCellClasses = {
  [key: string]: string
}

const CELL_WIDTH = 150

function Cell({
  cell,
  rowIndex,
  columnIndex,
  isRowHeader,
  isColumnHeader,
  meta,
  cellClasses,
  stickySide,
}: {
  cell: TCellData
  rowIndex: number
  columnIndex: number
  isRowHeader: boolean
  isColumnHeader: boolean
  meta: TRenderMeta
  cellClasses: TCellClasses
  stickySide: boolean
}) {
  if (meta[rowIndex]?.[columnIndex]) {
    return []
  }

  const colSpan = isRowHeader ? cell?.span : undefined
  const rowSpan = isColumnHeader ? cell?.span : undefined

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

  if (cell.styles) {
    styleNames.push(...cell.styles)
  }

  const cellClassName = styleNames
    .map((style) => cellClasses[style])
    .filter((className) => className != null)
    .join(' ')

  return html`<td
    class=${`${styles.cell} ${cellClassName}`}
    colspan=${colSpan}
    rowspan=${rowSpan}
    style=${style}
    .dataset=${{ column: columnIndex, row: rowIndex }}
  >
    <div class=${styles.cellContainer}>
      <div class=${styles.cellContent}>${cell.value}</div>
    </div>
  </td>`
}

function Row({
  key,
  row,
  rowIndex,
  isRowHeader,
  dataHeadColumnsCount,
  meta,
  cellClasses,
  stickySide,
}: {
  key: object
  row: TCellData[]
  rowIndex: number
  isRowHeader: boolean
  dataHeadColumnsCount: number
  meta: TRenderMeta
  cellClasses: TCellClasses
  stickySide: boolean
}) {
  return html.for(key, rowIndex.toString())`<tr
    data-rowIndex=${rowIndex}
  >
    ${row.flatMap((cell, columnIndex) =>
      Cell({
        cell,
        rowIndex,
        columnIndex,
        isRowHeader,
        isColumnHeader: dataHeadColumnsCount > columnIndex,
        meta,
        cellClasses,
        stickySide,
      })
    )}
  </tr>`
}

function TableRenderer(
  key: object,
  start: number,
  { values: table, headRowsCount, dataHeadColumnsCount }: TTableData,
  cellClasses: TCellClasses,
  stickySide: boolean,
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
        return Row({
          key,
          row,
          rowIndex,
          isRowHeader: headRowsCount > rowIndex,
          dataHeadColumnsCount,
          meta,
          cellClasses,
          stickySide,
        })
      })}
    </table>
  `
}

function TableContainer({
  content,
  headers,
  height,
  offset,
  onScroll,
  setContainerElement,
  className = '',
}: {
  content: Renderable
  headers: Renderable | null
  height: number
  offset: number
  onScroll: (value: number) => void
  setContainerElement: (value: HTMLElement) => void
  className?: string
}) {
  return html`
    <div
      class=${`${className} ${styles.container}`}
      ref=${setContainerElement}
      onscroll=${(e: MouseEvent) => {
        onScroll((e.target as HTMLDivElement).scrollTop)
      }}
      onwheel=${(e: WheelEvent) => {
        if (!e.ctrlKey) {
          e.stopPropagation()
        }
      }}
    >
      <div style=${`height: ${height}px;`}>
        <div class=${styles.stickyHeader}>${headers}</div>
        <div style=${`transform: translateY(${offset}px)`}>${content}</div>
      </div>
    </div>
  `
}

const modelsMap: WeakMap<HTMLElement, TableModel> = new Map()

function getTableModel({
  table,
  target,
  redraw,
  minCellHeight,
  stickyHeader,
}: {
  table: TTableData
  target: HTMLElement
  redraw: () => void
  minCellHeight: number
  stickyHeader: boolean
}) {
  let oldModel = modelsMap.get(target)

  if (oldModel?.containSameData(table)) {
    return oldModel
  }

  if (oldModel) {
    oldModel.dispose()
  }

  const model = new TableModel(table, redraw, minCellHeight, stickyHeader)
  modelsMap.set(target, model)

  return model
}

function Table({
  className,
  table,
  target,
  minCellHeight = 30,
  cellClasses = {},
  onCellClick,
  stickyHeader,
  stickySide,
}: {
  className?: string
  cellClasses?: {
    header?: string
    body?: string
  }
  table: TTableData
  target: HTMLElement
  minCellHeight?: number
  stickyHeader: boolean
  stickySide: boolean
  onCellClick?: ({}: { row: number; column: number }) => void
}) {
  const model = getTableModel({
    table,
    target,
    redraw,
    minCellHeight,
    stickyHeader,
  })
  target.style.setProperty('--table-min-cell-height', `${minCellHeight}px`)

  function redraw() {
    const data = model.visibleTableData

    const headers = data.headerRows
      ? TableRenderer(
          model,
          0,
          {
            dataHeadColumnsCount: data.dataHeadColumnsCount,
            headRowsCount: data.headerRows.length,
            values: data.headerRows,
          },
          cellClasses,
          stickySide,
          onCellClick
        )
      : null
    const content = TableRenderer(
      target,
      data.startRowIndex,
      data,
      cellClasses,
      stickySide,
      onCellClick
    )

    render(
      target,
      TableContainer({
        content,
        headers,
        height: model.contentHeight,
        offset: data.offset,
        onScroll: model.setScrollPosition,
        setContainerElement: model.setContainerElement,
        className,
      })
    )

    const tables = target.querySelectorAll('table')
    const headerTable = headers ? tables[0] : null
    const contentTable = headers ? tables[1] : tables[0]

    function updateHeights(index: number, table?: HTMLTableElement | null) {
      if (table) {
        const rowHeights = [...(table.children || [])].map((row) => row.clientHeight)
        model.setRowHeights(index, rowHeights)
      }
    }

    updateHeights(0, headerTable)
    updateHeights(data.startRowIndex, contentTable)
  }

  redraw()
}

function disposeTable(target: HTMLElement) {
  const model = modelsMap.get(target)

  if (model) {
    model.dispose()
    modelsMap.delete(target)
  }
}

export { Table, disposeTable }
