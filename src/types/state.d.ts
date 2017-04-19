/// <reference path="./window.d.ts" />

import { Map } from 'immutable'

import { WindowConfig } from '../components/Window'

declare global {
 interface Firebase {
    auth?: Auth
    authError?: any
    profile?: any
  }
  interface PropsFromState {
    documentTitle: string
    firebase: any
    menuOpen: boolean
    sidebarOpen: boolean
    windows: Map<string, Map<string, any>>
  }
  interface DispatchProps {
    toggleMenuOpen: Function
    onAppIconClick: Function
    onWindowChange: (config: WindowConfig) => void
    onWindowMove: Function
    onWindowDestroy: (id: string) => void
    setSidebarOpen: (value: boolean) => void
    toggleSidebarOpen: () => void
    toggleWindowFullScreen: (id: string) => void
  }
  type State = PropsFromState & {
    currentWindowId: (Id | null);
  };
}
