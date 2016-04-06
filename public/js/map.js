/*global L*/
/*global fetch*/

var map = L.map('map', {
    center: [39.5501, -105.7821],
    zoom: 13
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var GeoJSON;
map.addEventListener('moveend', getGeoJSON);

map.addEventListener('resize', getGeoJSON);

function getGeoJSON(){
  var bounds = map.getBounds();
  fetch('/api/trails?'+json.stringify(bounds))
  .then(function(res){ return res.json() })
  .then(function(newJSON){
    map.removeLayer(GeoJSON); //remove the old GeoJSON
    GeoJSON = L.geoJSON(newJSON).addTo(map); //Add the new GeoJSON
  });
}