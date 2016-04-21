import React from 'react'
import { Popup } from 'react-leaflet'
const Tooltip = ({distance, trailName, isActive, ...props}) => (
  <Popup {...props}>
    <span className='trail__tooltip'>
      <h5>
        { trailName || 'No name given' }
      </h5>
      <p>Estimated Distance: {isActive 
      ? guessLength(props.popupContainer, distance.addLength) + 'Miles'
      : '' 
      }
      </p>
    </span>
  </Popup>
)

function guessLength(layer, addLength) { //get the id out of the layer?
  let tempLatLng = null
  const { _latlngs, feature } = layer._layers[layer._leaflet_id-1]
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

export default Tooltip