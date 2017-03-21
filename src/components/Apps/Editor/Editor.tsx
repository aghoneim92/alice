/// <reference path="./index.d.ts" />

import * as React from 'react'
import { PureComponent } from 'react'

import { getFirebase } from 'react-redux-firebase'

import * as Firebase from 'firebase'

export const cssPrefix = 'os_editor'

class Editor extends PureComponent<any, any> {
  ref?: HTMLElement

  componentWillMount() {
    System.import('./index.scss')
    System.import('firepad/dist/firepad.css')
    System.import('codemirror/lib/codemirror.css')
  }

  componentDidMount() {
    if(this.ref) {
      (window as any).CodeMirror = require('codemirror')

      const Firepad = require('firepad/dist/firepad')

      const firebase: typeof Firebase = getFirebase()
      const firepadRef = firebase.database().ref()
      const codeMirror = (window as any).CodeMirror(this.ref, { lineWrapping: true });
      Firepad.fromCodeMirror(firepadRef, codeMirror,
      { richTextShortcuts: true, richTextToolbar: true, defaultText: 'Hello, World!' });
    }
  }


  handleRef = (ref: HTMLElement) => {
    this.ref = ref
  }

  render() {
    const { handleRef } = this

    return (
      <div className={cssPrefix}>
        <div ref={handleRef}/>
      </div>
    )
  }
}

export default Editor
