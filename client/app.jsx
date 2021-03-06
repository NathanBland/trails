/*global fetch
  global navigator
*/
import 'babel-polyfill'
import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'
import 'whatwg-fetch'

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

initializeGeoJSON()
getLocation()
ReactDOM.render(
  <App store={store} />,
  document.querySelector('.grid')
)

function initializeGeoJSON(){
  store.dispatch({
    type:'GET_GEOJSON'
  })
  
  fetch('/api/trails?center=' + JSON.stringify([options.center[1], options.center[0]]))
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

function getLocation() {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(function(pos){
      console.log(pos)
      store.dispatch({type: 'FOUND_USER', payload: {location: [pos.coords.latitude, pos.coords.longitude]}})
    }, function(rejcted){
      console.log('uh oh:', rejcted)
    })
  }
}