import React, { Component } from 'react'
import { Popup } from 'react-leaflet'

export default class Tooltip extends Component {

  componentWillMount(){
    this.guessLength()
  }

  guessLength() { //get the id out of the layer?
    if(this.props.id in this.props.distances) return // we already mounted this guy once

    const { popupContainer: layer, distance: { addLength } } = this.props
    const { _latlngs, feature } = layer._layers[layer._leaflet_id-1]
    let tempLatLng = null

    const distance = _latlngs.reduce((totalDistance, latlng)=> {
      if(tempLatLng == null){
        tempLatLng = latlng
        return totalDistance
      }
      totalDistance += tempLatLng.distanceTo(latlng)
      tempLatLng = latlng
      return totalDistance
    }, 0)

    const convertedDistance = (0.000621371 * distance).toFixed(2)
    addLength(feature._id, convertedDistance)
    return convertedDistance
  }

  render(){
    const { trailName, distances, id, ...props } = this.props
    return (
      <Popup {...props}>
      <span className='trail__tooltip'>
        <h5>
          { trailName || 'No name given' }
        </h5>
        <p>Estimated Distance: {distances[id]} Miles
        </p>
      </span>
    </Popup>
    )
  }
}