import ReactDOM from 'react-dom'
import React from 'react'
import { createStore } from 'redux'

import App from './components'
import reducer from './reducers'
import middleware from './middleware'

//Setup Store
function getDefaults() {
  //return the center and the zoom level
  var data = window.location.hash.substring(1).split(',')
  if(data.length !== 3){
    return {}
  }
  return {
    center: [
      parseFloat(data[0]),
      parseFloat(data[1])
    ],
    zoom: parseFloat(data[2]),
    geojson: []
  }
}

const options = Object.assign({ 
        center: [39.5501, -105.7821], 
        zoom: 10, 
        geojson: { 
            loading: false, 
            data: [] 
        } 
    }, 
    getDefaults()
)

const store = createStore(
    reducer,
    { map: options },
    middleware
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)