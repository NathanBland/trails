import Map from './map'
import React from 'react'
import { Provider } from 'react-redux'

export default ({
  store
}) => (
  <Provider store={store}>
    <Map />
  </Provider>
)