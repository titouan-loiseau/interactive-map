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
]

let LayerID = 0;

let importUmap = $.getJSON("https://files.u-angers.fr/data/f-ac65d1864a64da76.umap", function(readData) {
    readData.layers.forEach(dataPoi => {
        let useIcon;
        if(iconArray[LayerID] != undefined) {
            useIcon = iconArray[LayerID];
        }
        else {
            useIcon = iconArray[0];
        }
        L.geoJson(dataPoi,{
            pointToLayer: function(feature,latlng){
                var marker = L.marker(latlng,{icon: useIcon});					
                return marker;
            },
            onEachFeature: function(feature, layer) {
                layer.bindPopup('<h1>'+feature.properties.name+'</h1><hr><br>'
                            + feature.properties.description 
                            );
                addPoint(feature);
            }
        }).addTo(map);
        LayerID++;
    });
});

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