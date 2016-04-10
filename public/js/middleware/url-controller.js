export function updateURL (store){
    return next =>  action => {
        // update the current url
        if(action !== 'SET_MAP'){ 
            return next(action)
        } else {
            const results = next(action)
            const state = store.getState()
            window.location.hash = `${state.center},${state.zoom}`
            return results
        }
    }
}