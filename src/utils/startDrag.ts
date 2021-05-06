type TCallbacks = {
  onDragMove: ({}: { deltaX: number; deltaY: number }) => void
  onDragEnd: ({}: { deltaX: number; deltaY: number }) => void
}

export function startDrag(
  event: Pick<MouseEvent, 'screenX' | 'screenY'>,
  { onDragMove, onDragEnd }: TCallbacks,
  scale: number = 1
) {
  const startX = event.screenX
  const startY = event.screenY

  window.document.body.style.userSelect = 'none'

  function onMouseMove(event: MouseEvent) {
    onDragMove({
      deltaX: (event.screenX - startX) / scale,
      deltaY: (event.screenY - startY) / scale,
    })
  }

  function onMouseUp(event: MouseEvent) {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)

    onDragEnd({
      deltaX: (event.screenX - startX) / scale,
      deltaY: (event.screenY - startY) / scale,
    })

    window.document.body.style.userSelect = ''
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}
