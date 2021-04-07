import React, { useEffect, useState } from 'react'
import { ReactTable } from '../src'
import { TTableData } from '../src/types'

function App() {
  const [_, redraw] = useState(0)
  const [data, setData] = useState<TTableData>({
    values: [],
    headRowsCount: 0,
    dataHeadColumnsCount: 0,
  })

  useEffect(() => {
    const name = 'big.json'
    fetch(`./demo/${name}`)
      .then((response) => response.json())
      .then(setData)
  }, [])

  return (
    <>
      <button onClick={() => setData({ ...data })}>new data</button>
      <button
        onClick={() => {
          redraw(Math.random())
        }}
      >
        redraw
      </button>
      <ReactTable
        table={{
          ...data,
          // values: data.values.slice(0, 50),
        }}
        seed={Math.random()}
      />
    </>
  )
}

export default App
