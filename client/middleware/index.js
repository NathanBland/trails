import thunk from 'redux-thunk'
import { updateURL } from './url-controller'
import { applyMiddleware } from 'redux'
export default applyMiddleware(thunk, updateURL)