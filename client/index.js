import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter, IndexRoute, Route, Switch } from 'react-router-dom'

import store from './store/configStore'

import Btn from './atoms/Btn'

import Root from './containers/Root'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Root} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('application')
)
