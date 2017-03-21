import { lifecycle } from 'recompose'

export const enhancer = lifecycle({
  componentWillMount: () => System.import('./index.scss')
})
