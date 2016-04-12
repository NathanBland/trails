import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'
const loader = (props, context) => (<h2 className='trail__List--loading animated infinite pulse'>Loading trails...</h2>)

const list = ({
  trails,
  loading,
  actions
}) => (
    <div className="trail__List fadeIn">
      <h2 className="header">
      {loading
        ? loader()
        : ('Current Trails')
      }  
      </h2>
      {trails.map(trail => (
        <div key={trail._id} 
          className="trail__item"
          onClick={actions.list.highlight.bind(this, trail._id)}
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
                { isNaN(Number(trail.Lgth_Miles).toFixed(2) || (0.621371 * trail.length_km).toFixed(2))
                  ? 'Unknown'
                : Number(trail.Lgth_Miles).toFixed(2) || (0.621371 * trail.length_km).toFixed(2) } Miles
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
  trails: state.map.geojson.data
  .filter(layer => layer.properties.name || layer.properties.NAME)
  .map(layer => Object.assign({}, layer.properties, { _id: layer._id })), //Mutation is bad M'kay
  loading: state.map.geojson.loading
}),
dispatch => ({
  actions: {
    list: bindActionCreators(actions.list, dispatch)
  }
}))(list)