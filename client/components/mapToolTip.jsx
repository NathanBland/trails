import React from 'react'
import { PopUp } from 'react-leaflet'
const toolTip = ({
  name,
  length
}) => (
  <PopUp className='trail__tooltip'>
    <p>
      { name || 'No name given' }
    </p>
    <p>
      { length || 'Unknown' } Miles
    </p>
  </PopUp>
)


export default toolTip