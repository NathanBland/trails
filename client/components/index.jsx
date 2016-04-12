import Map from './map'
import List from './list'
import SettingsPanel from './settingsPanel'

import React from 'react'
import { Provider } from 'react-redux'

export default ({
  store
}) => (
  <Provider store={store}>
    <div className="grid">
      <Map />
      <List />
      <SettingsPanel/>
    </div>
  </Provider>
)