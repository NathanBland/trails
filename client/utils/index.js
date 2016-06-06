export function getDefaults() {
  //return the center and the zoom level
  const data = window.location.hash.substring(1).split(',')
  let stashed
  switch(data.length){
  case 3:
    stashed = {
      center: [
        parseFloat(data[0]),
        parseFloat(data[1])
      ],
      zoom: parseFloat(data[2]),
      active: undefined
    }
    break
  case 4:
    stashed = {
      center: [
        parseFloat(data[0]),
        parseFloat(data[1])
      ],
      zoom: parseFloat(data[2]),
      active: data[3]
    }
    break
  default:
    stashed = {}
  }


  return {
    center: [39.5501, -105.7821],
    zoom: 10,
    active: '',
    geojson: {
      loading: false,
      data: []
    },
    ...stashed
  }
}