import { html, render, Renderable } from 'uhtml'
import { TableModel, TVisibleTableData } from './model'
import { TCellData, TTableData } from './types'
import styles from './style.module.css'

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
  }px; background: ${isRowHeader || isColumnHeader ? '#efefef' : '#fff'}`

  return html`<td class=${styles.cell} colspan=${colSpan} rowspan=${rowSpan} style=${style}>
    <div class=${styles.cellContent}>${cell.value}</div>
  </td>`
}

function Row({
  key,
  row,
  rowIndex,
  isRowHeader,
  dataHeadColumnsCount,
  meta,
}: {
  key: object
  row: TCellData[]
  rowIndex: number
  isRowHeader: boolean
  dataHeadColumnsCount: number
  meta: TRenderMeta
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
      })
    )}
  </tr>`
}

function TableRenderer(
  key: object,
  start: number,
  { values: table, headRowsCount, dataHeadColumnsCount }: TTableData
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
        })
      })}
    </table>
  `
}

function TableContainer(
  content: Renderable,
  headers: Renderable | null,
  height: number,
  offset: number,
  onScroll: (value: number) => void,
  setContainerElement: (value: HTMLElement) => void,
  className: string
) {
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
}: {
  table: TTableData
  target: HTMLElement
  redraw: () => void
}) {
  let oldModel = modelsMap.get(target)

  if (oldModel?.containSameData(table)) {
    return oldModel
  }

  if (oldModel) {
    oldModel.dispose()
  }

  const model = new TableModel(table, redraw, 40)
  modelsMap.set(target, model)

  return model
}

function Table({
  table,
  target,
  className,
}: {
  table: TTableData
  target: HTMLElement
  className: string
}) {
  const model = getTableModel({ table, target, redraw })

  function redraw() {
    const data = model.visibleTableData
    console.log(data)

    const headers = TableRenderer(model, 0, {
      dataHeadColumnsCount: data.dataHeadColumnsCount,
      headRowsCount: data.headerRows.length,
      values: data.headerRows,
    })
    const content = TableRenderer(target, data.startRowIndex, data)

    render(
      target,
      TableContainer(
        content,
        headers,
        model.contentHeight,
        data.offset,
        model.setScrollPosition,
        model.setContainerElement,
        className
      )
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
