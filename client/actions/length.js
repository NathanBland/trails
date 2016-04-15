export function addLength(id, dist){  
  return {
    type: 'ADD_LENGTH',
    payload: {
      id,
      dist
    }
  }
}

export function clearLengths(){
  return {
    type: 'CLEAR_LENGTHS'
  }
}