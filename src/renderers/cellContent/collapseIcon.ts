import { html } from 'uhtml'

import styles from './collapseIcon.module.css'

type TProps = {
  className?: string
  onClick: () => void
  collapsed: boolean
}

function CollapseIcon({ className, onClick, collapsed }: TProps) {
  let collapseIconClass = `${className} ${styles.collapseIcon}`

  if (!collapsed) {
    collapseIconClass += ` ${styles.expanded}`
  }

  return html`<button class=${collapseIconClass} type="button" onclick=${onClick}>
    <svg viewBox="0 0 24 24" fill="currentcolor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
    </svg>
  </button>`
}

export { CollapseIcon }
