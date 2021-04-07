import React, { FC, useEffect, useRef } from 'react'
import { render } from 'uhtml'
import { TableRenderer } from './renderer'
import { TTableData } from './types'

type TProps = {
  table: TTableData
  seed: number
}

const ReactTable: FC<TProps> = ({ table, seed }) => {
  console.log('ReactTable')
  const ref = useRef<any>()

  useEffect(() => {
    render(ref.current, TableRenderer(table))
  }, [table, seed])

  return <div ref={ref} />
}

export { ReactTable }
