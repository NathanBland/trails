import { combineReducers } from 'redux'

import map from './map'
import distances from './distances'

export default combineReducers({
  map,
  distances
})