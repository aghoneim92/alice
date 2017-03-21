import { StatelessComponent } from 'react'

import './Editor'

declare module './Editor' {
  interface EditorProps {

  }

  type EditorComponent = StatelessComponent<EditorProps>
}
