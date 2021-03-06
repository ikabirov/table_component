import React, { useEffect, useRef } from 'react'

import { disposeTable, Table } from './renderers/table'
import { TTableCallbacks, TTableData, TTableResize } from './types'

type TProps = {
  className?: string
  table: TTableData
  minCellHeight?: number
  mergeCells?: boolean
  stickyHeader?: boolean
  stickySide?: boolean
  cellClasses?: {
    [key: string]: string | undefined
  }
  resize?: TTableResize
  callbacks?: TTableCallbacks
  defaultLinesCount?: number
  showCollapseIcons?: boolean
}

const ReactTable: React.FC<TProps> = ({
  table,
  className,
  minCellHeight,
  cellClasses,
  resize,
  mergeCells = true,
  stickyHeader = true,
  stickySide = true,
  callbacks,
  defaultLinesCount,
  showCollapseIcons,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = ref.current!

    Table({
      table,
      target,
      minCellHeight,
      cellClasses,
      mergeCells,
      stickyHeader,
      stickySide,
      callbacks,
      resize,
      defaultLinesCount,
      showCollapseIcons,
    })
  }, [
    table,
    minCellHeight,
    cellClasses,
    mergeCells,
    stickyHeader,
    stickySide,
    callbacks,
    resize,
    defaultLinesCount,
    showCollapseIcons,
  ])

  useEffect(() => {
    const target = ref.current!

    return () => disposeTable(target)
  }, [])

  return <div ref={ref} className={className} />
}

export { ReactTable }
