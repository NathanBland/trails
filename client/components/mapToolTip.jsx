import React from 'react'
import { PopUp } from 'react-leaflet'
const toolTip = ({
  trailName,
  trailLength
}) => (
  <PopUp className='trail__tooltip'>
    <h2>
      { trailName || 'No name given' }
    </h2>
    <p>
      { trailLength || 'Unknown' } Miles
    </p>
  </PopUp>
)


export default toolTip