import { html } from 'uhtml'

import styles from './progress.module.css'
import { TCellContentRenderer } from './types'

const TableCellProgress: TCellContentRenderer = ({ data: { value } }) => {
  const numericValue = +value
  const formatted = `${numericValue * 100}%`

  return html`<div class=${styles.container}>
    <div class=${styles.progress} style=${`width: ${formatted}`}></div>
    <div class=${styles.label}>${formatted}</div>
  </div>`
}

export { TableCellProgress }
