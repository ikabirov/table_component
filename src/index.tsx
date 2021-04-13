import React, { FC, useEffect, useRef } from 'react'
import { Table } from './renderer'
import { TTableData } from './types'

type TProps = {
  table: TTableData
  seed: number
}

const ReactTable: FC<TProps> = ({ table, seed }) => {
  console.log('ReactTable')
  const ref = useRef<any>()

  useEffect(() => {
    Table({ table, target: ref.current })
  }, [table, seed])

  return <div ref={ref} />
}

export { ReactTable }
