import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'

import App from './components'
import reducer from './reducers'
import middleware from './middleware'
import { getDefaults } from './utils'

const options = getDefaults()
const store = createStore(
  reducer,
  { map: options },
  middleware
)
ReactDOM.render(
  <App store={store} />,
  document.querySelector('.grid')
)