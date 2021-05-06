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
  className?: string
  content: Renderable
  headers: Renderable | null
  height: number
  offset: number
  onScroll: (top: number, left: number) => void
  setContainerElement: (value: HTMLElement) => void
}) {
  return html`
    <div
      class=${`${className} ${styles.container}`}
      ref=${(element: HTMLDivElement) => {
        setContainerElement(element)
      }}
      onscroll=${(e: MouseEvent) => {
        const { scrollLeft, scrollTop } = e.target as HTMLDivElement

        onScroll(scrollTop, scrollLeft)
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
