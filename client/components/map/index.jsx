import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map, TileLayer, GeoJson, Popup } from 'react-leaflet'
import Control from 'react-leaflet-control'
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
  distances,
  userLocation
}) => {
  let map; //used for the leafletElement if it exists.
  return (
    <Map
      id="map"
      center={defs.center}
      zoom={zoom}
      ref={(el) => el ? map = el.leafletElement : null}
      onLeafletMoveend={(ev) => actions.map.getGeoJSON(ev)}
      onLeafletResize={(ev) => actions.map.getGeoJSON(ev)}
    >
      <TileLayer
        url='https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {
        userLocation 
          ? (
            <Control position="topright">
              <button onClick={() => map.panTo(userLocation)}>
                Find Me!
              </button>
            </Control>
          )
          : null
      }
      
      { GeoJSON.data.map(feature => (
        <GeoJson
          key={feature._id}
          data={feature}
          style={getCurrentStyle(active, feature)}
          {...getCurrentStyle(active, feature)}
          onClick={() => actions.map.setActive(feature._id)}
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
}

const getActive = (feature, active) => feature._id === active

const getCurrentStyle = (active, feature) => (
  getActive(feature, active)
    ? activeStyle
    : myStyle
)

export default connect(
  state => ({
    distances: state.distances,
    center: state.map.center,
    zoom: state.map.zoom,
    GeoJSON: state.map.geojson,
    active: state.map.active,
    userLocation: state.map.userLocation
  }),
  dispatch => ({
    actions: {
      map: bindActionCreators(actions.map, dispatch),
      distance: bindActionCreators(actions.distance, dispatch)
    }
  })
)(map)
