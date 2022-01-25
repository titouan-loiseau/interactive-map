var list = document.getElementById('list');

function addPoint(data, imageIcon){

    //console.log(data);

    const bloc = document.createElement('div');
    bloc.className="bloc";

    bloc.onclick= function(){
        OpenPopup(data);
    }

    const content = document.createElement('div');
    content.className="content";


    content.appendChild(document.createTextNode(data.properties.name));

    
    const image = document.createElement('img');

    

    if(data.properties.description==undefined || !data.properties.description.includes('<img')){

        image.src = imageIcon.options.iconUrl;
        image.style.objectFit="scale-down"

    }else{
        image.src=data.properties.description.substring(
            data.properties.description.indexOf("src=") + 4, 
            data.properties.description.lastIndexOf(">")
        );
        image.style.objectFit="cover"

    }
 

    bloc.appendChild(image);



    bloc.appendChild(content);


    list.appendChild(bloc);

}

function clearList(){
    list.innerHTML = "";
}

function OpenHideNav() {
    var navbar = document.getElementById("open-nav");
    var info = document.getElementById("listTitle");
    if (info.innerHTML === "Show List") {
        info.innerHTML = "Hide List";
      } else {
        info.innerHTML = "Show List";
      }
    navbar.classList.toggle("opened");
    
}


function OpenPopup(data){

    map.setView([data.geometry.coordinates[1], data.geometry.coordinates[0]], 16);
    var popupData = '<h1>'+data.properties.name+'</h1><hr><br>' + String(data.properties.description).replaceAll("\n", "<br>");

    var popup = L.popup()
    .setLatLng([data.geometry.coordinates[1], data.geometry.coordinates[0]])
    .setContent(popupData)
    .openOn(map);

    //fermer la liste
    OpenHideNav();

}