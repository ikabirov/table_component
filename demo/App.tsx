import React, { useEffect, useState } from 'react'
import { ReactTable } from '../src'
import { TTableData } from '../src/types'
import styles from './styles.module.css'

function App() {
  const [_, redraw] = useState(0)
  const [show, setShow] = useState(true)
  const [data, setData] = useState<TTableData>({
    dataHeadColumnsCount: 0,
    headRowsCount: 0,
    values: [],
  })

  useEffect(() => {
    // const name = location.hash === '#invert' ? 'big_invert.json' : 'big.json'
    const name = 'big.json'
    // const name = 'data.json'
    fetch(`./demo/${name}`)
      .then((response) => response.json())
      .then(setData)
  }, [])

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'} table</button>
      <button onClick={() => setData({ ...data })}>new data</button>
      <button
        onClick={() => {
          redraw(Math.random())
        }}
      >
        redraw
      </button>
      {show && (
        <ReactTable
          table={data}
          className={styles.table}
          cellClasses={{
            body: styles.body,
            header: styles.header,
            total: styles.total,
          }}
          onCellClick={(data) => console.log(data)}
          stickyHeader={true}
          stickySide={true}
        />
      )}
    </div>
  )
}

export default App
