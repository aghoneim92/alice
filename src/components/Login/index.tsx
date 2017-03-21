import { LoginComponent } from './Login'
import { enhancer } from './enhancer'

import { asyncComponent } from 'react-async-component'

export const Login: LoginComponent = enhancer(
  asyncComponent({
    resolve: () => System.import(__dirname + '/Login')
  })
)
