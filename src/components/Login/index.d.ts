import { StatelessComponent } from 'react'

declare module './index' {
  interface LoginProps {
    onButtonClick: (provider: string) => void
  }
  type LoginComponent = StatelessComponent<LoginProps>
}
