
var API_KEY = "pk.eyJ1IjoibWVsaWhhIiwiYSI6ImNrN2plYjFraTBsbzAzbW1wdmdqOGliYWUifQ.ZulEecVGsyq77boZDoVf-w";


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data){
	var mapbackground = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
	attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	    maxZoom: 18,
	    id: "mapbox.streets",
	    accessToken: API_KEY
        });

	var myMap = L.map("mapid", {
          center: [45.52, -122.67],
          zoom: 1
        });

        mapbackground.addTo(myMap);


	L.geoJSON(data, {
		pointToLayer: function (feature, latlng) {

		    //figure out width based on magnitude
		    var rad = 8;
		    var fillCol = "ff7800";
		    if (((feature.properties.mag) > 0) && ((feature.properties.mag < 1))){
			fillCol = "#ffffff";
			rad = 6;
		    }
		    else if (((feature.properties.mag) >= 1) && ((feature.properties.mag <2))){
			fillCol = "#d4d4d4";
			rad = 8;
		    }
		    else if (((feature.properties.mag) >= 2) && ((feature.properties.mag <3))){
			fillCol = "#9c9c9c";
			rad = 10;
		    }
		    else if (((feature.properties.mag) >= 3) && ((feature.properties.mag <4))){
			fillCol = "#5e5e5e";
			rad = 12;
		    }
		    else if (((feature.properties.mag) >= 4) && ((feature.properties.mag <5))){
			fillCol = "#454545";
			rad = 14;
		    }
		    else if ((feature.properties.mag) >=  5){
			fillCol = "#000000";
			rad = 16;
		    }

		    //create style
		    var geojsonMarkerOptions = {
			radius: rad,
			fillColor: fillCol,
			color: "#000",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		    };


		    return L.circleMarker(latlng, geojsonMarkerOptions);
		},

		onEachFeature: function(feature, layer) {
                    layer.bindPopup("mag: " + feature.properties.mag);
                }


	    }).addTo(myMap);


	// leaflet code to generate legend
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {
	    
	    var div = L.DomUtil.create('div', 'info legend'),
	    grades = [0,1,2,3,4,5];
	    var gradeColors = ["#ffffff", "#d4d4d4", "#9c9c9c", "#5e5e5e", "#454545", "#000000"]; 
	    labels = [];

	    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + gradeColors[i] + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	    }

	    return div;
	};

	legend.addTo(myMap);

    });