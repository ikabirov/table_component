// @ts-ignore
import * as textMetrics from 'text-metrics'
import { html } from 'uhtml'

import styles from './text.module.css'
import { TCellContentRenderer } from './types'

const TableCellText: TCellContentRenderer = ({
  data: { value, rowResizeId },
  resize,
  resizeSignal,
  callbacks,
  defaultLinesCount,
}) => {
  let linesCount = (rowResizeId && resize?.rows?.[rowResizeId]) || defaultLinesCount
  let textElement: HTMLDivElement | null = null

  resizeSignal.on((info) => {
    if (!textElement || !rowResizeId) {
      return
    }

    if (info.state === 'preview') {
      const size = info.size
      const metrics = textMetrics.init(textElement, {
        wordBreak: 'break-all',
      })
      const lines: string[] = metrics.lines()

      const lineHeight = textElement.scrollHeight / lines.length

      const newLines = Math.ceil(size / lineHeight)

      textElement.style.webkitLineClamp = String(newLines)
    } else {
      const { onRowResize } = callbacks
      const linesCount = parseInt(textElement.style.webkitLineClamp, 10)

      textElement.style.webkitLineClamp = linesCount ? String(linesCount) : ''

      if (onRowResize && !isNaN(linesCount)) {
        onRowResize(rowResizeId, linesCount)
      }
    }
  })

  return html`<div
    ref=${(element: HTMLDivElement) => {
      textElement = element
    }}
    class=${styles.text}
    style=${`-webkit-line-clamp: ${linesCount}`}
  >
    ${value}
  </div>`
}

export { TableCellText }
