import { html } from 'uhtml'

import styles from './collapseIcon.module.css'

type TProps = {
  className: string
  onClick: () => void
  collapsed: boolean
}

function CollapseIcon({ className, onClick, collapsed }: TProps) {
  let collapseIconClass = `${className} ${styles.collapseIcon}`

  if (!collapsed) {
    collapseIconClass += ` ${styles.expanded}`
  }

  return html`<button class=${collapseIconClass} onclick=${onClick}>></button>`
}

export { CollapseIcon }
