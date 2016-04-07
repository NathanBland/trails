/*global L*/
/*global fetch*/

var myStyle = {
    "color": "#006400",
    "weight": 5,
    "opacity": 0.65
};

var options = Object.assign({ center: [39.5501, -105.7821], zoom: 10 }, getDefaults())
var map = L.map('map', options);

//'http://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}'
//
L.tileLayer('https://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var GeoJSON;
getGeoJSON()
map.addEventListener('moveend', getGeoJSON);
map.addEventListener('resize', getGeoJSON);
function getGeoJSON() {
  var center = map.getBounds().getCenter();
  updateURL([center.lat, center.lng], map.getZoom())
  fetch('/api/trails?center=' + JSON.stringify([center.lng, center.lat]))
    .then(function(res) {
      return res.json()
    })
    .then(function(newJSON) {
      if(GeoJSON){
        map.removeLayer(GeoJSON); //remove the old GeoJSON
      }
      GeoJSON = L.geoJson(newJSON, {
        style: myStyle,
        onEachFeature: function eachFeature(feature, layer){
          layer.bindPopup(feature.properties.NAME || 'No name given')
        }
      }).addTo(map); //Add the new GeoJSON
    });
}

function updateURL (center, zoom){
  // update the current url
  window.location.hash = center + ',' + zoom
}

function getDefaults(){
  //return the center and the zoom level
  var data = window.location.hash.split(',')
  return {
    center: [
      data[0],
      data[1]
    ],
    zoom: data[2]
  }
}
