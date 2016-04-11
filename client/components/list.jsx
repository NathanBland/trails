import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import action from '../actions/map'
const list = ({
  trails,
  actions
}) => (
    <div className="trail__List">
      <h2 className="header">Current Trails</h2>
      {trails.map(trail => (
        <div key={trail._id} 
          className="trail__item"
          onClick={actions.highlight.bind(this, trail._id)}
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
                {trail.Lgth_Miles.toFixed(2) || (0.621371 * trail.length_km).toFixed(2)} Miles
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
  .map(layer => Object.assign({}, layer.properties, { _id: layer._id })) //Mutation is bad M'kay
}),
dispatch => ({
  actions: bindActionCreators(action, dispatch)
}))(list)