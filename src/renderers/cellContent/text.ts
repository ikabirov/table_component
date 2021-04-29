import { html } from 'uhtml'

import styles from './text.module.css'

function TableCellText(value: string | number) {
  return html`<div class=${styles.text}>${value}</div>`
}

export { TableCellText }
