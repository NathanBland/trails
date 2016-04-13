import React from 'react'
import { Popup } from 'react-leaflet'
const Tooltip = (props) => (
  <Popup {...props}>
    <span className='trail__tooltip'>
    <h4>
      { props.trailName || 'No name given' }
    </h4>
    <p>Estimated Distance: {Number((0.000621371 * guessLength(props.popupContainer)).toFixed(2))} Miles
    </p>
    </span>
  </Popup>
)

function guessLength(layer) {
  let tempLatLng = null
  let coordArray = layer._layers[layer._leaflet_id-1]._latlngs
  const distance = coordArray.reduce((totalDistance, latlng)=> {
    if(tempLatLng == null){
        tempLatLng = latlng
        return totalDistance
      }
      totalDistance += tempLatLng.distanceTo(latlng)
      tempLatLng = latlng
      return totalDistance
    }, 0)
   
    return distance
}

export default Tooltip