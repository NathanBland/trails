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
initializeGeoJSON()

function initializeGeoJSON(){
  store.dispatch({
    type:'GET_GEOJSON'
  })
  
  fetch('/api/esri-trails?center=' + JSON.stringify(options.center.reverse()))
    .then(function(res) {
      return res.json()
    })
    .then(function(newJSON) {
      store.dispatch({
        type: 'SET_GEOJSON',
        payload: newJSON
      })
    })
}