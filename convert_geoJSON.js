function fixCoordinates(coor){
    if(Array.isArray(coor[0])) return coor.map(fixCoordinates)
    return [coor[0], coor[1]]
}

const GeoJSON = require('TRAILS_GEOJSON.json')

const json = GeoJSON.features.map(feature => {
    feature = {
        type: feature.type,
        properties: {
            "SOURCE_D00" : feature.properties.SOURCE_D00,
            "SOURCE_ORI" : feature.properties.SOURCE_ORI,
            "NAME" : feature.properties.NAME,
            "FTYPE" : feature.properties.FTYPE,
            "FCODE" : feature.properties.FCODE,
            "length_km" : feature.properties.length_km
        },
        geometry: {
            coordinates: feature.geometry.coordinates.map(fixCoordinates)
        }
    }    
    return feature
})
json.forEach(feature => console.log(JSON.stringify(feature)))