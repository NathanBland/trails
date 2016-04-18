export default (state = {}, {type, payload}) => {
  switch(type){
    case 'CLEAR_LENGTHS':
      return {}
    case 'ADD_LENGTH':
      return {
        ...state,
        [payload.id]: payload.dist
      }
    default:
      return state
  }
}
