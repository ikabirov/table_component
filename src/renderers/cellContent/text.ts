import { html } from 'uhtml'

import { TCellData } from '../../types'
import styles from './text.module.css'

function TableCellText({ value }: TCellData) {
  let linesCount: number | undefined

  return html`<div class=${styles.text} style=${`-webkit-line-clamp: ${linesCount}`}>${value}</div>`
}

export { TableCellText }
