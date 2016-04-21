import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../../actions'
import TrailItem from './trailItem'

const Loader = (props) => (<h2 className='trail__List--loading animated infinite pulse'>Loading trails...</h2>)

const list = ({
  trails,
  loading,
  actions,
  distances,
  active
}) => (
    <div className="trail__List fadeIn">
      <h2 className="header">
      {loading
        ? (<Loader />)
        : ('Current Trails')
      }
      </h2>
      {trails.map(trail => (
        <TrailItem
          key={trail._id}
          actions={actions}
          trail={trail}
          distance={distances[trail._id]}
          isActive={
            (active === trail._id)
            ? true
            : false
          }
        />
      ))}
    </div>
  )

export default connect(state => ({
  trails: state.map.geojson.data
    .filter(layer => layer.properties.name || layer.properties.NAME)
    .map(layer => ({ ...layer.properties, _id: layer._id })),
  loading: state.map.geojson.loading,
  distances: state.distances,
  active: state.map.active
}),
dispatch => ({
  actions: {
    list: bindActionCreators(actions.list, dispatch),
    map: bindActionCreators(actions.map, dispatch)
  }
}))(list)
