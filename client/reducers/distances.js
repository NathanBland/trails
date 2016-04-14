export default (state = {}, {type, payload}) => {
  switch(type){
    case 'CLEAR_LENGTHS':
      return {}
    case 'ADD_LENGTH':
      return Object.assign({}, state, { [payload.id]: payload.dist })
    default:
      return state
  }
}