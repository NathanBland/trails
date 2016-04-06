/*global L*/
/*global fetch*/

var map = L.map('map', {
  center: [39.5501, -105.7821],
  zoom: 10
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var GeoJSON;
getGeoJSON()
map.addEventListener('moveend', getGeoJSON);

map.addEventListener('resize', getGeoJSON);

function getGeoJSON() {
  var center = map.getBounds().getCenter();
  fetch('/api/trails?center=' + JSON.stringify([center.lng, center.lat]))
    .then(function(res) {
      return res.json()
    })
    .then(function(newJSON) {
      if(GeoJSON){
        map.removeLayer(GeoJSON); //remove the old GeoJSON
      }
      GeoJSON = L.geoJson(newJSON, {
        onEachFeature: function eachFeature(feature, layer){
          layer.bindPopUp(feature.properties.NAME)
        }
      }).addTo(map); //Add the new GeoJSON
    });
}