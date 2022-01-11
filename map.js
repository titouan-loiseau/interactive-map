var map = L.map('mapid').setView([47.48, -0.55], 13);

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '(c) <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
});
map.addLayer(osmLayer);

// 0: important places, 1: schools and universities, 2: ATM, 3: commerces, 4: Bars, 5: Gare, 6: Sports, 7: Park, 8: culture

let iconArray = [
    L.icon({
        iconUrl: 'icons/important.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    }),
    L.icon({
        iconUrl: 'icons/univ.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    }),
    L.icon({
        iconUrl: 'icons/atm.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    }),
    L.icon({
        iconUrl: 'icons/shops.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    }),
    L.icon({
        iconUrl: 'icons/bars.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    }),
    L.icon({
        iconUrl: 'icons/train-station.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    }),
    L.icon({
        iconUrl: 'icons/sports.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    }),
    L.icon({
        iconUrl: 'icons/parks.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    }),
    L.icon({
        iconUrl: 'icons/culture.png',
        iconSize: [32, 41],
        iconAnchor: [16, 41]
    })
];

let filters = [true, true, true, true, true, true, true, true, true];

function update() {
    let LayerID = 0;

    // Remove existing markers
    removeMarkers();

    // Read data
    $.getJSON("test.umap", function(readData) {

        // Loop through every layer
        readData.layers.forEach(dataPoi => {

            // Check that the layer is not filtered
            if(filters[LayerID]) {

                // Use the proper icon
                let useIcon;
                if(iconArray[LayerID] != undefined) {
                    useIcon = iconArray[LayerID];
                }
                else {
                    useIcon = iconArray[0];
                }

                // Add points
                L.geoJson(dataPoi,{
                    pointToLayer: function(feature,latlng){
                        var marker = L.marker(latlng,{icon: useIcon});	
                        return marker;
                    },
                    onEachFeature: function(feature, layer) {
                        layer.bindPopup('<h1>'+feature.properties.name+'</h1><hr><br>'
                                    + feature.properties.description 
                                    );
                    }
                }).addTo(map);
            }
            LayerID++;
        });
    });
}

function removeMarkers() {
    let first = true;
    map.eachLayer((layer) => {
        if(first) {
            first = false;
        }
        else {
            layer.remove();
        }
      });
}

update();

map.locate({setView: true, maxZoom: 16});
function onLocationFound(e) {
    var radius = e.accuracy;

    L.marker(e.latlng).addTo(map)
    .bindPopup("You are within " + radius + " meters from this point").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

map.on('locationfound', onLocationFound);
    function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);