export default (state = {
  geojson: {
    loading: false,
    data: []
  },
  active: '',
  center: [39.5501, -105.7821],
  zoom: 10
}, {
  type,
  payload
}) => {
  switch(type){
  case 'GET_GEOJSON':
    return {
      ...state,
      geojson: {
        ...state.geojson,
        loading: true
      }
    }
  case 'SET_MAP':
    return {...state, ...payload }
  case 'SET_GEOJSON':
    return {
      ...state,
      geojson: {
        ...state.geojson,
        loading: false,
        data: payload
      }
    }
  case 'SET_ACTIVE':
    return {
      ...state,
      active: payload
    }
  case 'FOUND_USER':
    return {
      ...state,
      userLocation: payload.location
    }
  default:
    return state
  }
}
