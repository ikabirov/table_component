import React, { useEffect, useRef } from 'react'
import { Table, disposeTable } from './renderer'
import { TTableData } from './types'

type TProps = {
  className?: string
  table: TTableData
  minCellHeight?: number
  stickyHeader?: boolean
  stickySide?: boolean
  cellClasses?: {
    [key: string]: string
  }
  onCellClick?: ({}: { row: number; column: number }) => void
}

const ReactTable: React.FC<TProps> = ({
  table,
  className,
  minCellHeight,
  cellClasses,
  stickyHeader = true,
  stickySide = true,
  onCellClick,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = ref.current!
    Table({
      table,
      target,
      className,
      minCellHeight,
      cellClasses,
      stickyHeader,
      stickySide,
      onCellClick,
    })

    return () => disposeTable(target)
  }, [table, className])

  return <div ref={ref} />
}

export { ReactTable }
