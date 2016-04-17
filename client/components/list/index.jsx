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
  distances
}) => (
    <div className="trail__List fadeIn">
      <h2 className="header">
      {loading
        ? (<Loader />)
        : ('Current Trails')
      }
      </h2>
      {trails.map(trail => (
        <TrailItem key={trail._id} actionts={actions} trail={trail} distance={distances[trail._id]}/>
      ))}
    </div>
  )

export default connect(state => ({
  trails: state.map.geojson.data
    .filter(layer => layer.properties.name || layer.properties.NAME)
    .map(layer => Object.assign({}, layer.properties, { _id: layer._id })),
  loading: state.map.geojson.loading,
  distances: state.distances
}),
dispatch => ({
  actions: {
    list: bindActionCreators(actions.list, dispatch),
    map: bindActionCreators(actions.map, dispatch)
  }
}))(list)