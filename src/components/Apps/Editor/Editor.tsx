/// <reference path="./index.d.ts" />

import * as React from 'react'
import { PureComponent } from 'react'

import AceEditor from 'react-ace'

import 'brace/mode/javascript'
import 'brace/theme/github'

import Toggle from 'react-toggle'

import { getFirebase } from 'react-redux-firebase'

import * as capitalize from 'capitalize'

import * as Firebase from 'firebase'

export const cssPrefix = 'os_editor'

class Editor extends PureComponent<any, any> {
  ref?: HTMLElement

  state = {
    mode: 'text'
  }

  componentWillMount() {
    System.import('./index.scss')
    System.import('firepad/dist/firepad.css')
    System.import('codemirror/lib/codemirror.css')
    System.import('react-toggle/style.css')
  }

  initEditor = () => {
    const { ref, editor, state: { mode } } = this

    ;(window as any).CodeMirror = require('codemirror')

    const Firepad = require('firepad/dist/firepad')

    const firebase: typeof Firebase = getFirebase()
    const firepadRef = firebase.database().ref()

    if(mode === 'code' && this.editor) {
      if(editor) {
        Firepad.fromACE(firepadRef, editor)
      }
    } else if(ref) {
      const codeMirror = (window as any).CodeMirror(ref, { lineWrapping: true });
      Firepad.fromCodeMirror(firepadRef, codeMirror,
      { richTextShortcuts: true, richTextToolbar: true, defaultText: 'Hello, World!' });
    }
  }

  componentDidMount() {
    this.initEditor()
  }

  componentWillUpdate({ mode }: { mode: string }) {
    if(this.state.mode !== mode) {
      this.initEditor()
    }
  }

  handleRef = (ref: HTMLElement) => {
    this.ref = ref
  }

  toggleMode = () => this.setState({
    mode: this.state.mode === 'code' ? 'text' : 'code',
  })

  editor?: any

  handleAceLoad = (editor: any) => this.editor = editor

  render() {
    const { handleAceLoad, handleRef, toggleMode, state: { mode } } = this

    return (
      <div className={cssPrefix}>
        <div className={`${cssPrefix}_switcher`}>
          <span className={`${cssPrefix}_mode`}>{capitalize(this.state.mode)}</span>
          <span className={`${cssPrefix}_toggle`}>
            <Toggle
              checked={this.state.mode === 'code'}
              onChange={toggleMode}
              icons={{
                checked: <i style={{color: 'white', marginTop: '-0.1em' }} className="fa fa-code"/>,
                unchecked: (
                  <svg
                    fill="#FFFFFF"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                        <path d="M24 24H0V0h24v24z" id="a"/>
                    </defs>
                    <clipPath id="b">
                      <use overflow="visible" xlinkHref="#a"/>
                    </clipPath>
                    <g>
                      <path d="M2.5 4v3h5v12h3V7h5V4h-13zm19 5h-9v3h3v7h3v-7h3V9z"/>
                    </g>
                  </svg>
                )
              }}
            />
          </span>
        </div>
        <div className={`${cssPrefix}_content`}>
          {
            mode === 'code' ? (
              <AceEditor
                mode="javascript"
                theme="github"
                onLoad={handleAceLoad}
                editorProps={{$blockScrolling: 1}}
                width='1000px'
                height='1000px'
              />
            ) : <div ref={handleRef}/>
          }
        </div>
      </div>
    )
  }
}

export default Editor
