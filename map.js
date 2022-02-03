var map = L.map('mapid', { 
    zoomControl: false}
).setView([47.48, -0.55], 13);

var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: '(c) <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
});
map.addLayer(osmLayer);

// 0: important places, 1: schools and universities, 2: ATM, 3: commerces, 4: Bars, 5: Gare, 6: Sports, 7: Park, 8: culture, p: health

let iconArray = [
    L.icon({
        iconUrl: 'new_icons/important.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/univ.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/atm.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/shops.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/bars.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/train-station.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/sports.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/parks.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/culture.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    }),
    L.icon({
        iconUrl: 'new_icons/health.png',
        iconSize: [39, 51],
        iconAnchor: [39/2, 51]
    })
];

let filters = [true, false, false, false, false, false, false, false, false, false, false, false, false];
let location_marker = undefined, location_circle = undefined;

function update() {
    let LayerID = 0;

    // Remove existing markers
    removeMarkers();
    
    //Clear list "list.js"
    clearList();

    // Add location marker back if it exists
    if(location_marker != undefined) {
        location_marker.addTo(map);
        location_circle.addTo(map);
    }
    
    //Clear List 
    clearList();


    // Read data
    $.getJSON("angers.umap", function(readData) {

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
                                    + String(feature.properties.description).replaceAll("\n", "<br>") 
                                    );
                        if(feature.geometry.type=="Point"){
                            addPoint(feature, useIcon);
                        }
                    }
                }).addTo(map);
            }
            LayerID++;
        });
    });
    updateloc();
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

function updateloc() {
    map.locate();
}

let t = setInterval(updateloc, 2000);

update();

function filterclick(id, el) {
    if(el.attributes["f-sel"].value == "1") {
        el.attributes["f-sel"].value = "0";
        filters[id] = false;
    }
    else {
        el.attributes["f-sel"].value = "1";
        filters[id] = true;
    }
    update();
}

function onLocationFound(e) {
    var radius = e.accuracy;

    if(location_marker == undefined) {
        location_marker = L.marker(e.latlng).addTo(map);
        location_circle = L.circle(e.latlng, radius).addTo(map);
    }
    else {
        let newLatLng = new L.LatLng(e.latlng.lat, e.latlng.lng);
        location_marker.setLatLng(newLatLng); 
        location_circle.setLatLng(newLatLng); 
        location_circle.setRadius(radius);
    }
}

map.on('locationfound', onLocationFound);
function onLocationError(e) {
    
}

map.on('locationerror', onLocationError);
