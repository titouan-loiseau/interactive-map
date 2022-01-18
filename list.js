var list = document.getElementById('list');

function addPoint(data){

    //console.log(data);

    list.innerHTML = "";


    const bloc = document.createElement('div');
    bloc.className="bloc";

    const image = document.createElement('img');
    image.src=data.properties.image;

    const content = document.createElement('div');
    content.className="content";

    const title = document.createElement('div');
    title.className="title";
    title.appendChild(document.createTextNode(data.properties.name));


    const description = document.createElement('div');
    description.className="description";
    description.appendChild(document.createTextNode(data.properties.description));

    bloc.appendChild(image);
    content.appendChild(title);
    content.appendChild(description);

    bloc.appendChild(content);


    list.appendChild(bloc);

}


function OpenHideNav() {
    console.log("Open");
    var navbar = document.getElementById("open-nav");
    navbar.classList.toggle("opened");
  }