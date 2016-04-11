import Fetch from 'fetch'

export function getGeoJSON(ev) {
  return (dispatch, getState) => {
    const map = ev.target
    let center = map.getBounds().getCenter()
    center = { 
      lat: parseFloat(center.lat.toFixed(4)), 
      lng: parseFloat(center.lng.toFixed(4)) 
    }
    
    dispatch({
      type: 'SET_MAP',
      payload: {
        center: [center.lat, center.lng], 
        zoom: map.getZoom()
      }
    })
    
    dispatch({
      type:'GET_GEOJSON'
    })
    
    fetch('/api/trails?center=' + JSON.stringify([center.lng, center.lat]))
      .then(function(res) {
        return res.json()
      })
      .then(function(newJSON) {
        dispatch({
          type: 'SET_GEOJSON',
          payload: newJSON
        })
      })
  }
}