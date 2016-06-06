export function addLength(id, dist){
  return {
    type: 'ADD_LENGTH',
    payload: {
      id,
      dist
    }
  }
}