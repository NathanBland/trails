export function updateURL (store){
  return next => action => {
    // update the current url
    if(action.type === 'SET_MAP' || action.type === 'SET_ACTIVE'){
      const results = next(action)
      const state = store.getState()
      window.location.hash = `${state.map.center},${state.map.zoom}${state.map.active?','+state.map.active:''}`
      return results
    } else {
      return next(action)

    }
  }
}