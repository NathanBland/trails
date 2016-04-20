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
  active
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
        {...active}
        key={feature._id}
        data={feature}
        style={getCurrentStyle(active, feature)}
        {...getCurrentStyle(active, feature)}
        onClick={() => actions.map.setActive(feature._id)}
      >
        <Tooltip{...active} distance={actions.distance} trailName={(feature.properties.NAME || feature.properties.name)}
        isActive={getActive(feature, active)}
        {...getActive(feature, active)}
          />
      </GeoJson>
    )) }
  </Map>
)

function getActive(feature, active) {
  if (feature._id === active) {
    return true
  } else {
    return false
  }
}

function getCurrentStyle(active, feature) {
  if (feature._id === active) {
    return activeStyle
  } else {
    return myStyle
  }
}

function eachFeature(feature, layer){
  const trail = feature.properties
  layer.bindPopup(

  )
}

export default connect(
  state => ({
    center: state.map.center,
    zoom: state.map.zoom,
    GeoJSON: state.map.geojson,
    active: state.map.active
  }),
  dispatch => ({
    actions: {
      map: bindActionCreators(actions.map, dispatch),
      distance: bindActionCreators(actions.distance, dispatch) //wrap all functions in this object with the dispatch actions
      //const bindActionCreators = (obj, dispatch) => (
      //  Object.keys(obj).reduce((o, k) => {
      //    o[k] = () => dispatch(o[k](arguments))//wrap all functions with dispatch
      //    reutrn o
      //  },
      //{})
    }
  })
)(map)