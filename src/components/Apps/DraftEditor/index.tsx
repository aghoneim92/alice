import * as React from 'react'
import { StatelessComponent } from 'react'

import { RichUtils } from 'draft-js'

import { Editor } from '../../Editor'

export const DraftEditor: StatelessComponent<any> = ({
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
