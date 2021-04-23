import React, { useEffect, useRef } from 'react'
import { Table, disposeTable } from './renderer'
import { TTableData } from './types'

type TProps = {
  className?: string
  table: TTableData
  minCellHeight?: number
  cellClasses?: {
    header?: string
    body?: string
  }
}

const ReactTable: React.FC<TProps> = ({ table, className, minCellHeight, cellClasses }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = ref.current!
    Table({ table, target, className, minCellHeight, cellClasses })

    return () => disposeTable(target)
  }, [table, className])

  return <div ref={ref} />
}

export { ReactTable }
