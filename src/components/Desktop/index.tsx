import { StatelessComponent } from 'react'

import { asyncComponent } from 'react-async-component'

import { DesktopProps } from './Desktop'

import { enhancer } from './enhancer'

System.import('./index.scss')

export const Desktop: StatelessComponent<DesktopProps> = enhancer(
  asyncComponent({
    resolve: () => System.import(__dirname + '/Desktop')
  })
)
