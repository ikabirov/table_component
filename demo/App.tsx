import React, { useEffect, useState } from 'react'
import { ReactTable } from '../src'
import { TTableData } from '../src/types'

function App() {
  const [_, redraw] = useState(0)
  const [data, setData] = useState<TTableData | null>(null)

  useEffect(() => {
    const name = location.hash === '#invert' ? 'big_invert.json' : 'big.json'
    // const name = 'big.json'
    // const name = 'data.json'
    fetch(`./demo/${name}`)
      .then((response) => response.json())
      .then(setData)
  }, [])

  if (!data) return <div>loading...</div>

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
