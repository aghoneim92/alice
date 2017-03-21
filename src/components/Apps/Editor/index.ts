import { asyncComponent } from 'react-async-component'

import { EditorComponent } from './Editor'

export const Editor: EditorComponent = asyncComponent({
  resolve: () => System.import(__dirname + '/Editor')
}) as any
