import { Hole } from 'uhtml'

import { TCellData, TTableCallbacks, TTableResize } from '../../types'
import { Signal } from '../../utils/signal'
import { TResizeInfo } from '../cell'

export type TCellContentRenderer = ({}: {
  data: TCellData
  resize: TTableResize
  resizeSignal: Signal<TResizeInfo>
  callbacks: TTableCallbacks
}) => Hole
