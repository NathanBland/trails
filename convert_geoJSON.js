function fixCoordinates(coor){
  if(Array.isArray(coor[0])) return coor.map(fixCoordinates)
  return [coor[0], coor[1]]
}

const GeoJSON = require('./data/points_filtered_compact.json')

const json = GeoJSON .map(feature => {
  feature = {
    type: feature.type,
    properties: feature.properties,
    geometry: {
      type: feature.geometry.type,
      coordinates: feature.geometry.coordinates
    }
  }
  if(feature.properties.other_tags){
    const others = feature.properties.other_tags.split(/("[^"]+"=>\"[^"]+",?)/g).reduce((obj, tag) => {
      const a = tag.split('=>').map(key => key.replace('"', '').replace('"', ''))
      obj[a[0]] = a[1] || ''
      return obj
    }, {})
    feature.properties = Object.assign({}, feature.properties, others)
  }
  return feature
})
json.forEach(feature => console.log(JSON.stringify(feature)))