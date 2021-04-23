import React, { useEffect, useRef } from 'react'
import { Table, disposeTable } from './renderer'
import { TTableData } from './types'

type TProps = {
  table: TTableData
  className?: string
}

const ReactTable: React.FC<TProps> = ({ table, className }) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const target = ref.current!
    Table({ table, target, className })

    return () => disposeTable(target)
  }, [table, className])

  return <div ref={ref} />
}

export { ReactTable }
