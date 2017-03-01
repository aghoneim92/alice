/// <reference path="./window.d.ts" />
/// <reference path="./action.d.ts" />
/// <reference path="./state.d.ts" />
/// <reference path="./react.d.ts" />

import { Map } from 'immutable'
import { ReactElement } from 'react'

declare global {

  interface Auth {
    currentUser?: any
  }

  interface GlobalWindow {
    isJsDOM?: boolean;
  }

  type Id = string
  
  type ImMap = Map<string, any>

  interface KeyedObject {
    [key: string]: any
  }

  interface NodeModule {
    hot?: {
      accept: Function
    };
    default?: any
  }

  interface NodeRequire {
    context: (regex: RegExp) => (
      ((value: string, index: number, array: string[]) => Object)
    & { keys: string[]; })
    ensure: (
      arr: string[],
      cb: (require: NodeRequire) => void,
      name?: string
    ) => void
  }

  var speechSynthesis: {
    speak: Function
  }
  var SpeechSynthesisUtterance: any;

  var System: {
    import: (module: string) => Promise<any>
  }

}

