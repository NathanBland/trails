import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map, TileLayer, GeoJson, PopUp } from 'react-leaflet'

import { getGeoJSON } from '../actions/map'
import { getDefaults } from './utils'

const myStyle = {
  "color": "#006400",
  "weight": 5,
  "opacity": 0.65
}

const map = ({
  center,
  zoom,
  GeoJSON,
  actions
}) => (
  <Map
    id="map"
    center={center}
    zoom={zoom}
    onLeafletMoveend={(ev) => actions.getGeoJSON(ev)}
    onLeafletResize={(ev) => actions.getGeoJSON(ev)}
  >
    <TileLayer
      url='https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    { GeoJSON.data.map(feature => (
      <GeoJson
        key={feature._id}
        data={feature}
        style={myStyle}
        onEachFeature={eachFeature}
      />
    )) }
  </Map>
)

function eachFeature(feature, layer){
  layer.bindPopup(
    `<p>
      ${feature.properties.NAME || 'No name given'}
    </p>
    <p>
      ${(0.621371 * feature.properties.length_km).toFixed(2)} Miles
    </p>`
  )
}

export default connect(
    state => ({
        center: state.map.center,
        zoom: state.map.zoom,
        GeoJSON: state.map.geojson
    }),
    dispatch => ({
        actions: {
            getGeoJSON: bindActionCreators(getGeoJSON, dispatch)
        }
    })
)(map)