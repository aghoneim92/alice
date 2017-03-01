import React, { StatelessComponent } from 'react'

import { Window } from '../Window/index'

System.import('./index.scss')

export interface WindowsProps {
  windows: ImMap;
}

export interface WindowsFragments {
  windows: DocumentFragment;
}

export const Windows: StatelessComponent<WindowsProps> = ({
  windows,
}) => (
  <div className='os_windows'>
  {
    windows.map(
      window => (
        <Window key={window.get('id')} window={window}/>
      )
    ).toArray()
  }
  </div>
)

