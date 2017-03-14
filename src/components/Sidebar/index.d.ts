import { MouseEventHandler } from 'react'

import { Map } from 'immutable'

import * as AppLauncher from './AppLauncher'

declare module './AppLauncher' {
  type MouseHandler = MouseEventHandler<HTMLElement>

  type Setter<T> = (value: T) => void

  interface StateCallbacks {
    setLaunching: Setter<boolean>
  }

  interface AppLauncherProps {
    onClick: MouseHandler
    app: Map<string, any>
    disableTooltip?: boolean
  }

  interface DerivedProps extends AppLauncherProps, StateCallbacks {
    launching: boolean
  }
}