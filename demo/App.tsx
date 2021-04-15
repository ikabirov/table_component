import React, { useEffect, useState } from 'react'
import { ReactTable } from '../src'
import { TTableData } from '../src/types'

function App() {
  const [_, redraw] = useState(0)
  const [data, setData] = useState<TTableData | null>(null)

  useEffect(() => {
    // const name = 'big_invert.json'
    const name = 'big.json'
    fetch(`./demo/${name}`)
      .then((response) => response.json())
      .then(setData)
  }, [])

  if (!data) return 'loading...'

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
      <ReactTable table={data} seed={Math.random()} />
    </>
  )
}

export default App
