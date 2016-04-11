import Map from './map'
import List from './list'
import React from 'react'
import { Provider } from 'react-redux'

export default ({
  store
}) => (
  <Provider store={store}>
    <div className="grid">
      <Map />
      <List />
    </div>
  </Provider>
)