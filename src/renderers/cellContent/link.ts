import { html } from 'uhtml'

import { TCellContentRenderer } from './types'

const TableCellLink: TCellContentRenderer = ({ data: { value } }) => {
  return html`<a target="blank" href="${value}">${value}</a>`
}

export { TableCellLink }
