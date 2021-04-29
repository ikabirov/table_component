import { html, Renderable } from 'uhtml'

import styles from './container.module.css'

function TableContainer({
  content,
  headers,
  height,
  offset,
  onScroll,
  setContainerElement,
  className = '',
}: {
  content: Renderable
  headers: Renderable | null
  height: number
  offset: number
  onScroll: (value: number) => void
  setContainerElement: (value: HTMLElement) => void
  className?: string
}) {
  return html`
    <div
      class=${`${className} ${styles.container}`}
      ref=${setContainerElement}
      onscroll=${(e: MouseEvent) => {
        onScroll((e.target as HTMLDivElement).scrollTop)
      }}
      onwheel=${(e: WheelEvent) => {
        if (!e.ctrlKey) {
          e.stopPropagation()
        }
      }}
    >
      <div style=${`height: ${height}px;`}>
        <div class=${styles.stickyHeader}>${headers}</div>
        <div style=${`transform: translateY(${offset}px)`}>${content}</div>
      </div>
    </div>
  `
}

export { TableContainer }
