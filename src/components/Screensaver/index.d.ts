import { MouseEventHandler } from 'react'

import '.'

declare module './index' {
  interface ScreensaverProps {
    screensaver?: string
    onClick: MouseEventHandler<HTMLElement>
  }
}
