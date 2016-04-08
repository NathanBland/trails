import Fetch from 'fetch'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

//Middleware
import thunk from 'redux-thunk'
function updateURL (store){
    return next =>  action => {
        // update the current url
        if(action !== 'SET_MAP'){ 
            return next(action)
        } else {
            const results = next(action)
            const state = store.getState()
            window.location.hash = `${state.center},${state.zoom}`
            return results
        }
    }
}

//Reducers
import reducer from './reducers'

//Setup Store
function getDefaults(){
  //return the center and the zoom level
  var data = window.location.hash.substring(1).split(',')
  if(data.length !== 3){
    return null
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

const options = Object.assign({ center: [39.5501, -105.7821], zoom: 10, geojson: [] }, getDefaults())
const store = createStore(
    reducer,
    { map: options },
    applyMiddleware(thunk, updateURL)
)


//Create Map
import { Map, TileLayer, GeoJson, PopUp } from 'react-leaflet'
const myStyle = {
    "color": "#006400",
    "weight": 5,
    "opacity": 0.65
};

const map = ({
    center,
    zoom,
    GeoJSON,
    dispatch
}) => (
    <Map
        id="map"
        center={center} 
        zoom={zoom}
        onLeafletMoveend={(ev) => dispatch(getGeoJSON.bind(this, ev))}
        onLeafletResize={(ev) => dispatch(getGeoJSON.bind(this, ev))}
    >
        <TileLayer
            url='https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {
            GeoJSON.map(feature => (
               <GeoJson
                    id={feature._id}
                    data={feature}
                    style={myStyle}
                    onEachFeature={function eachFeature(feature, layer){
                        layer.bindPopup(
                            `<p>
                                ${feature.properties.NAME || 'No name given'}
                            </p>
                            <p>
                                ${feature.properties.length_km} KM
                            </p>`
                        )
                    }}
                /> 
            ))
        }
        
    </Map>
)


//Actions
function getGeoJSON(ev) {
  return (dispatch, getState) => {
    console.log(ev)
//    var center = map.getBounds().getCenter();
    dispatch({
        type: 'SET_MAP',
        payload: {
//            center: [center.lat, center.lng], 
//            zoom: map.getZoom()
        }
    })
    const center = getState().map.center
    fetch('/api/trails?center=' + JSON.stringify([center[1], center[0]]))
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
}
const connectedMap = connect(
    state => ({
        center: state.map.center, 
        zoom: state.map.zoom, 
        GeoJSON: state.map.geojson
    }),
    dispatch => ({
        dispatch
    })
)(map)
ReactDOM.render(
    <Provider store={store}>
        {React.createElement(connectedMap, {})}
    </Provider>,
    document.getElementById('root')
)
store.dispatch(getGeoJSON({}))
window.addEventListener('moveend', (ev) => store.dispatch(getGeoJSON(ev)))
window.addEventListener('resize', (ev) => store.dispatch(getGeoJSON(ev)))