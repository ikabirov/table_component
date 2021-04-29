import { html } from 'uhtml'

import { TCellData } from '../../types'

function TableCellLink({ value }: TCellData) {
  return html`<a target="blank" href="${value}">${value}</a>`
}

export { TableCellLink }
