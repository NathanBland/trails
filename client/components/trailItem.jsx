import React from 'react'
import actions from '../actions'

const trailItem = ({
    trail
}) => (
    <div key={trail._id} 
        className="trail__item"
        // onClick={actions.list.highlight.bind(this, trail._id)}
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
            { isNaN(Number(trail.Lgth_Miles) || (0.621371 * trail.length_km))
            ? 'Unknown'
            : Number(trail.Lgth_Miles).toFixed(2) || (0.621371 * trail.length_km).toFixed(2) } Miles
            </li>
        </ul>
        <button className='button'><i class="fa fa-download" aria-hidden="true"></i> Enable Offline </button>
        </div>
    </div>
)        
        
export default trailItem