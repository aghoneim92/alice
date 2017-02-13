/// <reference path="./window.d.ts" />
/// <reference path="./action.d.ts" />
/// <reference path="./state.d.ts" />
/// <reference path="./react.d.ts" />

import { Map } from 'immutable'
import { ReactElement } from 'react'

declare global {
  type Id = string;
  type ImMap = Map<string, any>

  interface Reducer {
    (
      state: State,
      action: Action,
    ): State;
  }

  var System: {
    import: (module: string) => Promise<any>;
  };

  interface NodeModule {
    hot?: {
      accept: Function;
    };
  }

  interface NodeRequire {
    context: (regex: RegExp) => (
      ((value: string, index: number, array: string[]) => Object)
    & { keys: string[]; });
    ensure: (
      arr: string[],
      cb: (require: NodeRequire) => void,
      name?: string
    ) => void;
  }

}

