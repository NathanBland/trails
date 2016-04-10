import { connect } from 'react-redux'
import React from 'react'
import mapActions from '../actions/map'
import { bindActionCreators } from 'redux'

//Create Map
import { Map, TileLayer, GeoJson, PopUp } from 'react-leaflet'
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
        onLeafletMoveend={(ev) => actions.map.getGeoJSON(ev)}
        onLeafletResize={(ev) => actions.map.getGeoJSON(ev)}
        onLeafletLoad={(ev) => actions.map.getGeoJSON(ev)}
    >
        <TileLayer
            url='https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {
            GeoJSON.data.map(feature => (
               <GeoJson
                    key={feature._id}
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



export default connect(
    state => ({
        center: state.map.center, 
        zoom: state.map.zoom, 
        GeoJSON: state.map.geojson
    }),
    dispatch => ({
        actions: {
            map: bindActionCreators(mapActions, dispatch)
        }
    })
)(map)