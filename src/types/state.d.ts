/// <reference path="./window.d.ts" />
import { Map } from 'immutable'

declare global {
 interface Firebase {
    auth?: Auth
    authError?: any
    profile?: any
  }
  interface PropsFromState {
    documentTitle: string
    emoji: string
    firebase?: Firebase
    menuOpen?: boolean
    windows: Map<string, Map<string, any>>
  }
  interface DispatchProps {
    toggleMenuOpen: Function
    onAppIconClick: Function
  }
  type State = PropsFromState & {
    currentWindowId: (Id | null);
  };
}
