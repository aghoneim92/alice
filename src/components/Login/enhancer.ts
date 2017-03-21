import { lifecycle } from 'recompose'

export const enhancer = lifecycle({
  componentWillMount: () => {
    System.import('./index.scss')
    System.import('bootstrap/less/bootstrap.less').then(
      () => System.import('bootstrap-social/bootstrap-social.css')
    )
  }
})
