// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">
let mymap
let markers = []
let infowindow

function initMap () {
  mymap = L.map('mapid').setView([32.88133958969508, -117.23756116129134], 13)

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
                    maxZoom: 18,
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, ' +
                        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox/streets-v11',
                    tileSize: 512,
                    zoomOffset: -1
                }).addTo(mymap)
}

function createMarker (X, Y) {
  var marker = L.marker([X, Y]).addTo(mymap)
  markers.push([X, Y])  
}

function lookAt (X, Y) {
  mymap.flyTo([X, Y])
}

async function getData () {
  const textField = document.querySelector('textarea')
  return [textField.value, markers]
}

async function setData (data) {
  const textField = document.querySelector('textarea')
  textField.value = data[0]
  markers = []
  markers.push([data[1][0][0], data[1][0][1]])
  mymap = L.marker([data[1][0][0], data[1][0][1]]).addTo(mymap) 
}