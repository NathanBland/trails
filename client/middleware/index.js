import thunk from 'redux-thunk'
import { updateURL } from './url-controller'
import { applyMiddleware, compose } from 'redux'
export default compose(
  applyMiddleware(thunk, updateURL),
  typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
)
