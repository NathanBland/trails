export default (state = {}, {type, payload}) => {
  switch(type){
    case 'ADD_LENGTH':
      return {
        ...state,
        [payload.id]: payload.dist
      }
    default:
      return state
  }
}
