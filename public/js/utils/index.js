export function getDefaults() {
  //return the center and the zoom level
  const data = window.location.hash.substring(1).split(',')
  let stashed
  if(data.length !== 3){
    stashed = {}
  } else {
    stashed = {
      center: [
        parseFloat(data[0]),
        parseFloat(data[1])
      ],
      zoom: parseFloat(data[2]),
      geojson: []
    }
  }


  return Object.assign({
    center: [39.5501, -105.7821],
      zoom: 10,
      geojson: {
        loading: false,
        data: []
      }
    },
    stashed
  )
}