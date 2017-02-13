/// <reference path="./window.d.ts" />
import { Map } from 'immutable'

declare global {
  interface State {
    currentWindowId: (Id | null);
    windows: Map<string, Map<string, any>>;
    firebase: any;
    routing: any;
  }
}
