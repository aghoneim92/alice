/// <reference path="./window.d.ts" />

interface IState {
  currentWindowId: (Id | null);
  windows: {
    [key: string]: IWindow;
  };
}

type State = ImMap