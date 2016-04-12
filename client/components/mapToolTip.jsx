import React from 'react'
import { PopUp } from 'react-leaflet'
const toolTip = ({
  trailName,
  trailLength
}) => (
  <span className='trail__tooltip'>
    <h2>
      { trailName || 'No name given' }
    </h2>
    <p>
      { trailLength || 'Unknown' } Miles
    </p>
  </span>
)


export default toolTip