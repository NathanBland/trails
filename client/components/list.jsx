import { connect } from 'react-redux'
import React from 'react'

const list = ({
  trails
}) => (
    <div className="trail__List">
      <h2 className="header">Current Trails</h2>
      {trails.map((trail, idx) => (
        <div key={idx} 
          className="trail__item"
          >
          <div className="trail__item--body">
            <div className="trail__item--header">
              <h4>{trail.name || trail.NAME || 'No Name'}</h4>
            </div>
            <ul className="trail__item--details">
              <li>
                <span>
                  distance:
                </span>
                { Number(trail.Lgth_Miles).toFixed(2) || (0.621371 * trail.length_km).toFixed(2) || 'Uknown'} Miles
              </li>
              {/*
                <li>
                  <span>
                    elevation:
                  </span> 9, 000 ft.
                </li>
              */}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )

export default connect(state => ({
  trails: state.map.geojson.data.map(layer => layer.properties)
}))(list)