import { derive, track } from 'react-derive'
import * as WindowsDesktop from 'react-desktop/windows'
import * as MacOSDesktop from 'react-desktop/macOs'
import { compose, path } from 'ramda'

// import { pure } from 'recompose'

import { GetComponents, WindowToObject, WindowProps } from './index'

const windowToObject: WindowToObject = ({
  window
}) => window.toObject()

const handlersToObject = ({
  handlers
}: WindowProps) => handlers.remove('onResize').toObject()

const getTheme = path(['window', 'theme'])

const getComponents: GetComponents = ({
  theme,
}) =>
  theme.includes('mac') ?
    MacOSDesktop
  : WindowsDesktop

const windowDeriver = derive({
  window: track('window')(windowToObject),
})
const handlersDeriver = derive({
  handlers: track('handlers')(handlersToObject)
})
const themeDeriver = derive({
  theme: track('window')(getTheme),
})
const componentsDeriver = derive({
  components: track('theme')(getComponents),
})

export const decorate = compose(
  // pure,
  windowDeriver,
  themeDeriver,
  componentsDeriver,
  handlersDeriver,
)
