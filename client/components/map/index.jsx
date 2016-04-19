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
  color: '#42310F',
  weight: 5,
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
        key={feature._id}
        data={feature}
        style={feature._id === active
          ? activeStyle
          : myStyle
        }
      >
        <Tooltip distance={actions.distance} trailName={(feature.properties.NAME || feature.properties.name)}
        isActive={
          feature._id === active
          ? true
          : false
        }/>
      </GeoJson>
    )) }
  </Map>
)

function getLocation() {
  if (navigator) {
    navigator.geolocation.getCurrentPosition(successFunc, failFunc)
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