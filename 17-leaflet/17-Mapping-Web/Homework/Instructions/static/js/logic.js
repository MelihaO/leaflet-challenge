var apiKey = "pk.eyJ1IjoibWVsaWhhIiwiYSI6ImNrN2plYjFraTBsbzAzbW1wdmdqOGliYWUifQ.ZulEecVGsyq77boZDoVf-w";
var Url = ("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {

    d3.json(Url, function(data) {
    createFeatures(data.features);
    console.log(data.features);
      
      });


var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: apiKey
  
blackmap.addTo(map);

