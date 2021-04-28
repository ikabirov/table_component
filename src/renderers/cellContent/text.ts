import { html } from 'uhtml'

function TableCellLink(value: string | number) {
  return html`<a target="blank" href="${value}">${value}</a>`
}

export { TableCellLink }
