import { render } from 'uhtml'
import { TableModel } from '../model'
import { TTableData } from '../types'
import { TableContainer } from './container'
import { TableContent } from './content'

const modelsMap: WeakMap<HTMLElement, TableModel> = new Map()

function getTableModel({
  table,
  target,
  redraw,
  minCellHeight,
  stickyHeader,
  mergeCells,
}: {
  table: TTableData
  target: HTMLElement
  redraw: () => void
  minCellHeight: number
  stickyHeader: boolean
  mergeCells: boolean
}) {
  let oldModel = modelsMap.get(target)

  if (oldModel?.containSameData(table)) {
    return oldModel
  }

  if (oldModel) {
    oldModel.dispose()
  }

  const model = new TableModel({
    data: table,
    onChange: redraw,
    minRowHeight: minCellHeight,
    stickyHeader,
    mergeCells,
  })
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
  mergeCells,
}: {
  className?: string
  cellClasses?: {
    header?: string
    body?: string
  }
  table: TTableData
  target: HTMLElement
  minCellHeight?: number
  mergeCells: boolean
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
    mergeCells,
  })
  target.style.setProperty('--table-min-cell-height', `${minCellHeight}px`)

  function redraw() {
    const data = model.visibleTableData

    const headers = data.headerRows
      ? TableContent(
          model,
          0,
          {
            dataHeadColumnsCount: data.dataHeadColumnsCount,
            headRowsCount: data.headerRows.length,
            values: data.headerRows,
          },
          cellClasses,
          stickySide,
          mergeCells,
          onCellClick
        )
      : null
    const content = TableContent(
      target,
      data.startRowIndex,
      data,
      cellClasses,
      stickySide,
      mergeCells,
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