var list = document.getElementById('list');

function addPoint(data){

    //console.log(data);

    const bloc = document.createElement('div');
    bloc.className="bloc";



    const content = document.createElement('div');
    content.className="content";


    content.appendChild(document.createTextNode(data.properties.name));

    
    const image = document.createElement('img');


    
    if(data.properties.description!=undefined && data.properties.description.includes('<img')){
        
        image.src=data.properties.description.substring(
            data.properties.description.indexOf("src=") + 4, 
            data.properties.description.lastIndexOf(">")
        );

    }

    bloc.appendChild(image);



    bloc.appendChild(content);


    list.appendChild(bloc);

}

function clearList(){
    list.innerHTML = "";
}

function OpenHideNav() {
    console.log("Open");
    var navbar = document.getElementById("open-nav");
    navbar.classList.toggle("opened");
}
