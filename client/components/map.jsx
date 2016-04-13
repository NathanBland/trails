import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map, TileLayer, GeoJson, PopUp } from 'react-leaflet'

import actions from '../actions'
import { getDefaults } from '../utils'
import Tooltip from './mapToolTip'

const myStyle = {
  color: '#006400',
  weight: 5,
  opacity: 0.65
}
const defs = getDefaults()

const map = ({
  zoom,
  GeoJSON,
  actions
}) => (
  <Map
    id="map"
    center={defs.center}
    zoom={zoom}
    onLeafletMoveend={(ev) => actions.map.getGeoJSON(ev)}
    onLeafletResize={(ev) => actions.map.getGeoJSON(ev)}
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
        //onEachFeature={eachFeature}
        >
        <PopUp>
      <Tooltip trailName='${(trail.NAME || trail.name)}'
        trailLength={ isNaN(Number(feature.properties.Lgth_Miles).toFixed(2)
          || (0.621371 * feature.properties.length_km).toFixed(2))
        ? 'Unkown'
      : Number(trail.Lgth_Miles).toFixed(2) || (0.621371 * trail.length_km).toFixed(2) }
      />
    </PopUp>
    </GeoJson>
    )) }
  </Map>
)

function eachFeature(feature, layer){
  const trail = feature.properties
  layer.bindPopup(
    <PopUp>
      <Tooltip trailName='${(trail.NAME || trail.name)}'
        trailLength={ isNaN(Number(feature.properties.Lgth_Miles).toFixed(2)
          || (0.621371 * feature.properties.length_km).toFixed(2))
        ? 'Unkown'
      : Number(trail.Lgth_Miles).toFixed(2) || (0.621371 * trail.length_km).toFixed(2) }
      />
    </PopUp>
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
      map: bindActionCreators(actions.map, dispatch)
    }
  })
)(map)