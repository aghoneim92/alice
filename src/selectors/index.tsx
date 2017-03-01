import * as React from 'react'
import { StatelessComponent } from 'react'

import { DRAFT_EDITOR, NES as NES_WINDOW } from './../constants/WindowTypes';
import { createSelector } from 'reselect'
import { prop, unary } from 'ramda'
import { applyArray, safeCall } from '../lib/functional'
import { Map } from 'immutable'

import { RichUtils } from 'draft-js'

import { Editor } from '../components/Editor/index'
import * as NES from '../components/NES/index'

const currentWindowIdSelector = prop('currentWindowId')
const windowsSelector = prop('windows')
const firebaseSelector = prop('firebase')
const firebasePaths = ['auth', 'authError', 'profile'].map(unary(prop))

const applyFirebasePathsTo = applyArray(firebasePaths)

const DraftEditor: StatelessComponent<any> = ({
  editor,
  onBoldClick,
  onEditorTab,
  onEditorChange,
}) => (
  <Editor
    state={editor}
    onBoldClick={onBoldClick}
    onChange={onEditorChange}
    onKeyCommand={
      (command: any) => {
        const newState = RichUtils.handleKeyCommand(
            editor,
            command
        );
        if (newState) {
          onEditorChange(newState);
          return true
        }
        return false
      }
    }
    onTab={onEditorTab}
  />
)

const windowApps = {
  [DRAFT_EDITOR]: DraftEditor,
  [NES_WINDOW]: NES,
}

export default {
  currentWindow: createSelector(
    currentWindowIdSelector,
    windowsSelector,
    (
      currentWindowId: string,
      windows: Map<string, any>
    ) => windows.get(currentWindowId)
  ),
  windows: createSelector(
    windowsSelector,
    (windows: ImMap) => windows.map(
      window => {
        const type = window.get('type')

        const app = windowApps[type]

        if(app) {
          return window.set('app', app)
        }

        return window
      }
    )
  ),
  firebase: createSelector(
    firebaseSelector,
    (firebase: KeyedObject) => {
      const [ auth, authError, profile ] = applyFirebasePathsTo(firebase).map(unary(safeCall))

      return {
        auth,
        authError,
        profile,
      }
    }
  )
}
