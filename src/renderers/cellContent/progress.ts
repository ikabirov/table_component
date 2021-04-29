import { html } from 'uhtml'

import { TCellData } from '../../types'
import styles from './progress.module.css'

function TableCellProgress({ value }: TCellData) {
  const numericValue = +value
  const formatted = `${numericValue * 100}%`

  return html`<div class=${styles.container}>
    <div class=${styles.progress} style=${`width: ${formatted}`}></div>
    <div class=${styles.label}>${formatted}</div>
  </div>`
}

export { TableCellProgress }
