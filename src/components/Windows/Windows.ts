import React, { PureComponent } from 'react'
import { createContainer } from 'react-transmit'
import Window from '../Window/Window'

export interface WindowsProps {
  windows: Immutable.Map<string, any>;
}

export interface WindowsContainer {
  (props: WindowsProps): (ReactElement<WindowsProps> | null);
}

const Windows: WindowsContainer = ({
  windows,
}) => (
  <div className='os_windows'>
  {
    windows.map(
      (window: Immutable.Map<string, key>) => (
        <Window
          key={window.get('id')}
          {...window.toObject()}
        />
      )
    )
  }
  </div>
)
