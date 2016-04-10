export default (state = {
  geojson: [],
  center: [39.5501, -105.7821],
  zoom: 10
}, {
  type,
  payload
}) => {
  switch(type){
    case 'GET_GEOJSON':
      return Object.assign({}, state, { geojson: Object.assign({}, state.geojson, { loading: true }) })
    case 'SET_MAP': 
      return Object.assign({}, state, payload)
    case 'SET_GEOJSON':
      return Object.assign({}, state, { geojson: Object.assign({}, state.geojson, { loading: false, data: payload }) })
    default:
      return state
  }
}