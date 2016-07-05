import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Map, TileLayer, GeoJson, Popup } from 'react-leaflet'
import Choropleth from 'react-leaflet-choropleth'

import Control from 'react-leaflet-control'
import actions from '../../actions'
import { getDefaults } from '../../utils'
import Tooltip from './mapToolTip'
import DivIcon from 'react-leaflet-div-icon'

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

let leafletMap; //used for the leafletElement if it exists.

const map = ({
  zoom,
  GeoJSON,
  actions,
  active,
  distances,
  userLocation
}) => {
  return (
    <Map
      id="map"
      center={defs.center}
      zoom={zoom}
      ref={(el) => el ? leafletMap = el.leafletElement : null}
      onMoveend={(ev) => actions.map.getGeoJSON(ev)}
      onResize={(ev) => actions.map.getGeoJSON(ev)}
    >
      <TileLayer
        url='https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {
        userLocation 
          ? (
            <Control position="topright">
              <button onClick={() => leafletMap.panTo(userLocation)}>
                Find Me!
              </button>
            </Control>
          )
          : null
      }
      {
        userLocation
        ? (
          <DivIcon position={userLocation}>
            <svg className="user-location" viewBox="0 0 120 120" version="1.1"
              xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="50"/>
              <circle cx="60" cy="60" r="50">
              </circle>

            </svg>
          </DivIcon>
        )
        : null
      }
      <Choropleth
        data={GeoJSON.data}
        valueProperty={(feature) => Math.random()}
        scale={['#b3cde0', '#011f4b']}
        steps={7}
        mode='e'
        style={getCurrentStyle.bind(this, active)}
        onClick={function(ev) {
          actions.map.setActive(ev.layer.feature._id);
          this._map.panTo(this.getBounds().getCenter());
        }}
      >
      </Choropleth>
      
      { /*GeoJSON.data.map(feature => (
        <GeoJson
          key={feature._id}
          data={feature}
          style={getCurrentStyle(active, feature)}
          {...getCurrentStyle(active, feature)}
          onClick={function() {actions.map.setActive(feature._id); this._map.panTo(this.getBounds().getCenter());}}
        >
          
        </GeoJson>
      )) */}
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
