import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actions from '../actions'
import { getDefaults } from '../utils'

const toolTip = ({
  name,
  length
}) => (
  <span className='trail__tooltip'>
    <p>
      { name || 'No name given' }
    </p>
    <p>
      { length || 'Unknown' } Miles
    </p>
  </span>
)


export default connect(
  state => ({
    name: '',
    length: ''
  }),
  dispatch => ({
    actions: {
      map: bindActionCreators(actions.toolTip, dispatch)
    }
  })
)(toolTip)