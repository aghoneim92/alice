require('react-hot-loader/patch')

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'

import store from '../store/index'
import history from '../history'

const div = document.createElement('div')

document.querySelector('body')!.appendChild(div)

System.import('../components/OS').then(
  (m: { default: any; }) => {
    const { default: OS  } = m;

    doRender(OS)

    if (module.hot) {
      module.hot.accept('../components/OS', () =>
        doRender(OS)
      );
    }
  }
)

const doRender = (OS: any) => render(
  <AppContainer>
    <Provider {...{store}}>
      <Router history={history}>
        <Route path='/' component={OS}/>
      </Router>
    </Provider>
  </AppContainer>,
  div,
)
