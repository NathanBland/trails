import React from 'react'
import actions from '../actions'

const trailItem = ({
    trail,
    distance
}) => (
    <div
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
                { distance } Miles
                </li>
            </ul>
            <div className='trail__item--actions'>
                <button className='button'><i className="fa fa-download" aria-hidden="true"></i> Enable Offline </button>
                <button className='button'><i className="fa fa-map-o" aria-hidden="true"></i> Get Directions </button>
            </div>
        </div>
    </div>
)        
        
export default trailItem