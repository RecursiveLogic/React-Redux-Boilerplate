import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { HashRouter, Route, Switch } from 'react-router-dom'

import store from './store/configStore'

import Root from './containers/Root'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Root} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('application')
)
