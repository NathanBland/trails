export function updateURL (store){
  return next => action => {
    // update the current url
    if(action.type !== 'SET_MAP'){
      return next(action)
    } else {
      const results = next(action)
      const state = store.getState()
      window.location.hash = `${state.map.center},${state.map.zoom}`
      return results
    }
  }
}