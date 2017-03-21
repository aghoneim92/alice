import { StatelessComponent } from 'react'

declare module './Login' {
  interface LoginProps {
  }
  type LoginComponent = StatelessComponent<LoginProps>
}
