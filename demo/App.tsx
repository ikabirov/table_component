import React, { useEffect, useState } from 'react'

import { ReactTable } from '../src'
import { TTableData, TTableResize } from '../src/types'
import styles from './styles.module.css'

function App() {
  const [_, redraw] = useState(0)
  const [show, setShow] = useState(true)
  const [stickyHeader, setStickyHeader] = useState(true)
  const [stickySide, setStickySide] = useState(true)
  const [data, setData] = useState<TTableData>({
    dataHeadColumnsCount: 0,
    headRowsCount: 0,
    values: [],
    columnsOrder: [],
  })
  const [resize, setResize] = useState<TTableResize>({
    columns: {},
    rows: {},
  })

  useEffect(() => {
    // const name = location.hash === '#invert' ? 'big_invert.json' : 'big.json'
    // const name = 'big.json'
    const name = 'big_invert.json'

    fetch(`./demo/${name}`)
      .then((response) => response.json())
      .then((data: TTableData) =>
        setData({
          ...data,
          columnsOrder: new Array(data.values[0]!.length)
            .fill('')
            .map((_, index) => String(index % 3)),
        })
      )
  }, [])

  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? 'hide' : 'show'} table</button>
      <button onClick={() => setData({ ...data })}>new data</button>
      <button onClick={() => setStickyHeader(!stickyHeader)}>
        turn {stickyHeader ? 'off' : 'on'} sticky header
      </button>
      <button onClick={() => setStickySide(!stickySide)}>
        turn {stickySide ? 'off' : 'on'} sticky side
      </button>
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
            collapse: styles.collapse,
          }}
          callbacks={{
            onCellClick: (data) => console.log('click', data),
            onCellMouseDown: (data) => console.log('mousedown', data),
            onCellMouseUp: (data) => console.log('mouseup', data),
            // onCellMouseOver: ({ column, row }) => console.log(`over ${row}:${column}`),
            // onCellMouseOut: ({ column, row }) => console.log(`out ${row}:${column}`),
            onColumnResize: (id, width) => {
              setResize({
                ...resize,
                columns: {
                  ...resize.columns,
                  [id]: width,
                },
              })
            },
            onRowResize: (id, lines) =>
              setResize({
                ...resize,
                rows: {
                  ...resize.rows,
                  [id]: lines,
                },
              }),
          }}
          stickyHeader={stickyHeader}
          stickySide={stickySide}
          mergeCells={true}
          resize={resize}
          defaultLinesCount={2}
          showCollapseIcons
        />
      )}
    </div>
  )
}

export default App
