import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map, TileLayer, GeoJson, Popup } from 'react-leaflet'

import actions from '../../actions'
import { getDefaults } from '../../utils'
import Tooltip from './mapToolTip'

const myStyle = {
  color: '#006400',
  weight: 5,
  opacity: 0.65
}
const activeStyle = {
  color: '#36AB36',
  weight: 10,
  opacity: 0.65
}
const defs = getDefaults()

const map = ({
  zoom,
  GeoJSON,
  actions,
  active,
  distances
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
        style={getCurrentStyle(active, feature)}
        {...getCurrentStyle(active, feature)}
        onClick={function() {actions.map.setActive(feature._id); this._map.panTo(this.getBounds().getCenter());}}
      >
        <Tooltip
          id={feature._id}
          actions={actions}
          distance={distances[feature._id]}
          trailName={(feature.properties.NAME || feature.properties.name)}
          isActive={getActive(feature, active)}
          autoPan={false}
        />
      </GeoJson>
    )) }
  </Map>
)

const getActive = (feature, active) => feature._id === active

const getCurrentStyle = (active, feature) => (
  getActive(feature, active)
    ? activeStyle
    : myStyle
)

function eachFeature(feature, layer){
  const trail = feature.properties
  layer.bindPopup(

  )
}

export default connect(
  state => ({
    distances: state.distances,
    center: state.map.center,
    zoom: state.map.zoom,
    GeoJSON: state.map.geojson,
    active: state.map.active
  }),
  dispatch => ({
    actions: {
      map: bindActionCreators(actions.map, dispatch),
      distance: bindActionCreators(actions.distance, dispatch)
    }
  })
)(map)
