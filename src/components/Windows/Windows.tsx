import React, { ReactElement } from 'react'
import { createContainer } from 'react-transmit'

import { Window } from '../Window/Window'

export interface WindowsProps {
  windows: ImMap;
}

export interface WindowsFragments {
  windows: DocumentFragment;
}

export interface WindowsContainer {
  (props: WindowsProps): (ReactElement<WindowsProps> | null);
}

const Windows: WindowsContainer = ({
  windows,
}) => (
  <div className='os_windows'>
  {
    windows
  }
  </div>
)

export default createContainer(
  Windows, {
    fragments: {
      windows: ({ windows }: WindowsProps) => Promise.all(
        windows.map(
          (window: ImMap) => Window.getFragment('id', { id: window.get('id') })
        ).toArray()
      )
    }
  }
)
