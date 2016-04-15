import React from 'react'

const settingsPanel = ({
}) => (
  <div className='map__options'>
    <button className='button-clear map__options--toggle'>
        <i className='fa fa-gear'> </i>
        Settings
    </button>
    <ul className='map__options--settings'>
        <li className='map__options--distance'>
            Distance: 
            <input id='measurementTypeKm' type='radio' value='km' name='measurementType'/>
            <label className='label-inline' for='measurementTypeKm'> Km</label>
            <input id='measurementTypeM' type='radio' value='miles' name='measurementType'/>
            <label className='label-inline' for='measurementTypeM'> Miles</label>
        </li>
    </ul>
  </div>
)


export default settingsPanel
