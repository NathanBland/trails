import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../actions'
import trailItem from './trailItem'
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
        <trailItem trail={trail}/>
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