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
}: {
  cell: TCellData
  rowIndex: number
  columnIndex: number
  isRowHeader: boolean
  isColumnHeader: boolean
  meta: TRenderMeta
  cellClasses: TCellClasses
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

  const style = `position: ${isColumnHeader ? 'sticky' : 'static'}; left: ${
    columnIndex * CELL_WIDTH
  }px;`

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
}: {
  key: object
  row: TCellData[]
  rowIndex: number
  isRowHeader: boolean
  dataHeadColumnsCount: number
  meta: TRenderMeta
  cellClasses: TCellClasses
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
      })
    )}
  </tr>`
}

function TableRenderer(
  key: object,
  start: number,
  { values: table, headRowsCount, dataHeadColumnsCount }: TTableData,
  cellClasses: TCellClasses
) {
  const meta: TRenderMeta = {}

  return html`
    <table class=${styles.table}>
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
      onscroll=${(e: any) => {
        onScroll(e.target.scrollTop)
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
}: {
  table: TTableData
  target: HTMLElement
  redraw: () => void
  minCellHeight: number
}) {
  let oldModel = modelsMap.get(target)

  if (oldModel?.containSameData(table)) {
    return oldModel
  }

  if (oldModel) {
    oldModel.dispose()
  }

  const model = new TableModel(table, redraw, minCellHeight)
  modelsMap.set(target, model)

  return model
}

function Table({
  className,
  table,
  target,
  minCellHeight = 30,
  cellClasses = {},
}: {
  className?: string
  table: TTableData
  target: HTMLElement
  minCellHeight?: number
  cellClasses?: {
    header?: string
    body?: string
  }
}) {
  const model = getTableModel({ table, target, redraw, minCellHeight })
  target.style.setProperty('--table-min-cell-height', `${minCellHeight}px`)

  function redraw() {
    const data = model.visibleTableData

    const headers = TableRenderer(
      model,
      0,
      {
        dataHeadColumnsCount: data.dataHeadColumnsCount,
        headRowsCount: data.headerRows.length,
        values: data.headerRows,
      },
      cellClasses
    )
    const content = TableRenderer(target, data.startRowIndex, data, cellClasses)

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

    const [headerTable, contentTable] = target.querySelectorAll('table')

    function updateHeights(index: number, table?: HTMLTableElement) {
      const rowHeights = [...(table?.children || [])].map((row) => row.clientHeight)
      model.setRowHeights(index, rowHeights)
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
