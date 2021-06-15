import { render } from 'uhtml'

import { TableModel } from '../model'
import { TTableCallbacks, TTableData, TTableResize } from '../types'
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
  showCollapseIcons,
}: {
  table: TTableData
  target: HTMLElement
  redraw: () => void
  minCellHeight: number
  stickyHeader: boolean
  mergeCells: boolean
  showCollapseIcons: boolean
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
    showCollapseIcons,
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
  callbacks = {},
  stickyHeader,
  stickySide,
  mergeCells,
  resize = {
    rows: {},
    columns: {},
  },
  defaultLinesCount,
  showCollapseIcons = false,
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
  resize?: TTableResize
  callbacks?: TTableCallbacks
  defaultLinesCount?: number
  showCollapseIcons?: boolean
}) {
  const model = getTableModel({
    table,
    target,
    redraw,
    minCellHeight,
    stickyHeader,
    mergeCells,
    showCollapseIcons,
  })

  target.style.setProperty('--table-min-cell-height', `${minCellHeight}px`)

  function redraw() {
    const data = model.visibleTableData
    const headers = data.headerRows
      ? TableContent({
          key: model,
          start: 0,
          tableData: {
            dataHeadColumnsCount: data.dataHeadColumnsCount,
            headRowsCount: data.headerRows.length,
            values: data.headerRows,
            resize: data.resize,
            columnsOrder: data.columnsOrder,
          },
          cellClasses,
          stickySide,
          mergeCells,
          resize,
          callbacks,
          controller: model,
          hiddenRows: data.hiddenRows,
          defaultLinesCount,
        })
      : null
    const content = TableContent({
      key: target,
      start: data.startRowIndex,
      tableData: data,
      cellClasses,
      stickySide,
      mergeCells,
      resize,
      callbacks,
      controller: model,
      hiddenRows: data.hiddenRows,
      defaultLinesCount,
    })

    render(
      target,
      TableContainer({
        content,
        headers,
        height: data.contentHeight,
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
        const rowHeights = [...(table.children || [])]
          .filter((node) => node.tagName === 'TR')
          .map((row) => row.clientHeight)

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

export { disposeTable, Table }
