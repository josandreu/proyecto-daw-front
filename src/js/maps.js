import iconMarkerPng from '../images/pin_32.png';
import iconCluster from '../images/m1.png';
import {addStarsToInfoWindow, addStarsToList} from "./utils/utils";
import {getLocalStorageUserId, requestOptionsForAuthorizationFromStorage} from "./api/utils";

function getViewportWidth() {
  if(window.innerWidth) {
    return window.innerWidth;
  } else if(document.body && document.body.offsetWidth) {
    return document.body.offsetWidth;
  } else {
    return 0;
  }
}

function getViewportHeight() {
  if(window.innerHeight) {
    return window.innerHeight;
  } else if(document.body && document.body.offsetHeight) {
    return document.body.offsetHeight;
  } else {
    return 0;
  }
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function moveAndResizeAlojamientoListInDesktop() {
  let viewportWidth = getViewportWidth();
  let viewportHeight = getViewportHeight();
  let bodyContainer = document.getElementById('body');
  let searchContainer = document.getElementById('search-container');
  let alojamientoListContainer = document.getElementById('alojamiento-list-container');
  let map = document.getElementById('map');
  let khBody = document.getElementById('body');
  let footer = document.getElementById('footer');
  let padding = 32;
  if(viewportWidth >= 1024) {
    alojamientoListContainer.style.height = (viewportHeight - searchContainer.offsetHeight - padding).toString();
    bodyContainer.appendChild(alojamientoListContainer);
    insertAfter(khBody, map);
    insertAfter(map, footer);
  } else {
    insertAfter(searchContainer, map);
    alojamientoListContainer.style.height = 'auto';
    insertAfter(alojamientoListContainer, footer);
  }
}

async function getAlojamientos(url = 'https://daw-wp-api.local/wp-json/api/v1/alojamientos/author/') {
  let userId = getLocalStorageUserId();

  let requestOptions = requestOptionsForAuthorizationFromStorage('GET');

  try {
    let response = await fetch(url + userId, requestOptions);
    return await response.json();
  } catch(error) {
    if(error) {
      console.log(error);
    }
  }
}

function prepareField(field) {
  field = field.trim();
  if(field.includes(";")) {
    return field.split(";");
  } else {
    return field;
  }
}

function getLat(alojamiento) {
  return alojamiento.coordenadas.split(",")[0].trim();
}

function getLong(alojamiento) {
  return alojamiento.coordenadas.split(",")[1].trim();
}

function getInitTypes(json) {
  let types = [];
  json.forEach(alojamiento => {
    let type = prepareField(alojamiento.tipo);
    if(typeof type === 'string' || type instanceof String) {
      types.push(type);
    } else {
      type.forEach(alojamiento => {
        types.push(alojamiento);
      });
    }
  });
  return types.filter(removeDuplicates);
}

function getTypes(arr) {
  let types = [];
  arr.forEach(type => {
    types.push(type);
  });
  return types.filter(removeDuplicates);
}

function removeDuplicates(value, index, self) {
  return self.indexOf(value) === index;
}

function showTypeAlojamientos(alojamientos) {
  const list = document.getElementById('type-list');
  list.innerHTML = '';
  alojamientos.forEach(alojamiento => {
    // create filter buttons for each alojamiento
    let li = document.createElement('li');
    li.className += 'px-1 cursor-pointer';
    let item = document.createElement('a');
    // px-1 py-1 text-white rounded
    item.className += 'alojamiento-filter-button transform transition-all duration-150 inline-block bg-gray-100 bg-opacity-75 text-xs hover:shadow-sm hover:scale-105" cursor-pointer border-b-2';
    li.appendChild(item);
    addColourTextAlojamiento(alojamiento, item);
    list.appendChild(li);
  });
  if(alojamientos.length > 0) {
    // create the all items button
    let li = document.createElement('li');
    li.className += 'alojamiento-filter-button-all-container';
    let item = document.createElement('a');
    item.className += 'alojamiento-filter-button-all text-right text-xs ml-5 cursor-pointer text-bold';
    item.textContent += 'Ver todos';
    li.appendChild(item);
    list.appendChild(li);
  }
}

function addColourTextAlojamiento(alojamiento, item) {
  alojamiento = alojamiento.toLowerCase();
  alojamiento = removeAccents(alojamiento);
  switch(alojamiento) {
    case 'hotel':
      item.className += ' border-blue-600'
      item.textContent += 'Hotel';
      break;
    case 'hostal':
      item.className += ' border-green-600'
      item.textContent += 'Hostal';
      break;
    case 'bed & breakfast':
      item.className += ' border-yellow-600'
      item.textContent += 'Bed & breakfast';
      break;
    case 'camping':
      item.className += ' border-red-600'
      item.textContent += 'Camping';
      break;
    case 'albergue':
      item.className += ' border-gray-600'
      item.textContent += 'Albergue';
      break;
    case 'casa rural':
      item.className += ' border-yellow-400'
      item.textContent += 'Casa rural';
      break;
  }
}

function isEmpty(str) {
  return (!str || 0 === str.length);
}

function isString(str) {
  return typeof str === 'string' || str instanceof String;
}

function parseAddress(address) {
  let parseAddress = [];
  let arrayAddress = address.split(";");
  if(!isEmpty(arrayAddress[0])) {
    parseAddress.push(arrayAddress[0].trim());
    parseAddress.push(arrayAddress[1].trim());
    return parseAddress;
  } else {
    parseAddress.push(arrayAddress[1].trim());
    return parseAddress;
  }
}

function cleanList() {
  let container = document.getElementById('alojamientos-container');
  container.innerHTML = '';
}

function removeAccents(string) {
  const accents = {'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U'};
  return string.split('').map(char => accents[char] || char).join('').toString();
}

function filterLinks(element) {
  let alojamientos = document.querySelectorAll('.alojamientos-container div.alojamiento-info');
  // get text
  let el = element.textContent;
  let linksPrepared = el.replace(" ", "-");
  linksPrepared = removeAccents(linksPrepared);
  // if all remove all elements
  if(el === 'Ver todos') {
    // first show all view class
    each('.view', function(e) {
      e.classList.remove('view');
    });
    // no show init animation
    animateAndAddViewClass(alojamientos);
  } else {
    // if not click all remove all elements
    each('.view', function(e) {
      e.classList.remove('view');
    });
    // show animation for current elements
    animateAndAddViewClass(document.querySelectorAll('.' + linksPrepared.toLowerCase()));
  }
}

function each(el, callback) {
  let allDivs = document.querySelectorAll(el),
    alltoArr = Array.prototype.slice.call(allDivs);
  Array.prototype.forEach.call(alltoArr, function(selector, index) {
    if(callback) {
      return callback(selector);
    }
  });
}

function animateAndAddViewClass(item) {
  (function show(counter) {
    setTimeout(function() {
      if(item[counter] !== undefined) {
        item[counter].classList.add('view');
      }
      counter++;
      if(counter < item.length) {
        show(counter);
      }
    }, 50);
  })(0);
}

function animateAndFilter(items) {
  animateAndAddViewClass(items);
  // filter on click
  each('.type-list li a', function(el) {
    el.addEventListener('click', function(e) {
      e.preventDefault();
      filterLinks(el);
    });
  });
}

// calculate distance functions
function getUserPosition() {
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(returnPosition);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function returnPosition(position) {
  console.log(position);
  return position;
}

// todo
function setUserCurrentPosition(locationButton, map) {
  //map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // infoWindow.setPosition(pos);
          // infoWindow.setContent("Location found.");
          // infoWindow.open(map);
          map.setCenter(pos);
          map.setZoom(13);
          return pos;
        },
        () => {
          handleLocationError(true, map.getCenter());
        }, {timeout: 10000}
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, pos) {
  console.log(browserHasGeolocation ? "Error: The Geolocation service failed. Position: " + pos : "Error: Your browser doesn't support geolocation.");
  let span = document.getElementById('info-no-location');
  span.textContent = 'Lo sentimos, pero no ha sido posible determinar su ubicación.'
}

function rad(x) {
  return x * Math.PI / 180;
}

function getDistance(p1, p2) {
  let R = 6378137; // Earth’s mean radius in meter
  let dLat = rad(p2.lat() - p1.lat());
  let dLong = rad(p2.lng() - p1.lng());
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  let km = d / 1000;
  return km.toFixed(2); // returns the distance in meter
}

function getCoordinates(item) {
  let coordinates = [];
  let text = item.textContent;
  let lat = text.split(",")[0].trim();
  let lng = text.split(",")[1].trim();
  coordinates.push(lat, lng);
  return coordinates;
}

function addCoordinates(map, index) {
  let coordinateElement = document.getElementsByClassName('info-coordinates-' + index)[0];
  let coordinates = getCoordinates(coordinateElement);
  let parent = coordinateElement.parentNode.parentNode;
  parent.addEventListener('click', function() {
    map.setCenter({lat: parseFloat(coordinates[0]), lng: parseFloat(coordinates[1])});
    map.setZoom(17);
  });
  document.getElementById("default-tab").click();
}

function showAlojamientoListFromData(index, marker) {
  const containerList = document.getElementById('alojamientos-container');
  let typeClass = marker.customInfo.tipo.toLowerCase().replace(" ", "-");
  const mainContainer = `        
                <div class="alojamiento-info hidden bg-white w-full flex flex-col items-center rounded-md shadow-lg transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer ${typeClass}">
                    <img src="${marker.customInfo.foto}" class="rounded-t-md object-cover h-40 w-full" alt="">
                    <div class="flex flex-col w-full p-4">
                      <div class="py-2 flex justify-between items-center">
                        <div class="font-semibold text-xl mr-2 text-gray-900 dark:text-white">${marker.customInfo.nombre}</div>
                        <span class="transform transition-all duration-150 inline-block bg-opacity-75 text-xs hover:shadow-sm hover:scale-105 ${typeClass}">${marker.customInfo.tipo}</span>
                      </div>
                      <div id="alojamiento-rating-${index}" class="flex items-center mb-4">
                          <svg id="star-0" class="mx-1 ml-0 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <svg id="star-1" class="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <svg id="star-2" class="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <svg id="star-3" class="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                          <svg id="star-4" class="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                      </div>
                      <div class="w-full">
                        <div class="alojamiento-directions mb-4">
                            <p class="text-gray-900 text-sm">${marker.customInfo.direccion}</p>
                            <p class="text-gray-900 text-sm">${marker.customInfo.localidad}</p>
                        </div>
                        <div class="alojamiento-comments mt-2 p-4 text-justify bg-gray-100">
                            <p class="text-gray-900 text-sm">${marker.customInfo.comentarios}</p>
                        </div>
                      </div>
                      <div class="py-2 mt-2 flex justify-evenly items-center">
                        <a target="_blank" href="${marker.customInfo.como_llegar}" class="tracking-wide text-blue-500 text-sm hover:underline py-2 px-2 inline-flex items-center"><span class="mx-auto">Cómo llegar</span></a>
                        <a target="_blank" href="${marker.customInfo.web}" class="tracking-wide text-blue-500 text-sm hover:underline py-2 px-2 inline-flex items-center"><span class="mx-auto">Web</span></a>
                      </div>
                      <span id="info-coordinates" class="hidden info-coordinates-${index}">${marker.customInfo.coordenadas}</span>
                    </div>
                </div>
  `;
  containerList.insertAdjacentHTML('beforeend', mainContainer);
}

function showIfListEmpty() {
  const containerList = document.getElementById('alojamientos-container');
  const mainContainer = `
          <div class="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div class="p-4 flex space-x-4 md:flex-row flex-col md:text-left text-center items-center">
                <div class="bg-red-50 p-3 md:self-start rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 fill-current text-red-700" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"/></svg>
                </div>
                <div>
                    <h1 class="text-xl font-semibold tracking-wide text-red-700">
                        Lista vacía
                    </h1>
                    <p class="text-gray-500">
                        Puedes insertar tu primer alojamiento desde el botón de <a class="font-bold" href="#buttonOpenModal">'Añadir Alojamiento'</a> situado en la parte superior.
                    </p>
                </div>
            </div>
  `;
  containerList.insertAdjacentHTML('beforeend', mainContainer);
}

// Listen for orientation changes
//window.addEventListener("orientationchange", moveAndResizeAlojamientoListInDesktop, false);

//window.addEventListener('resize', moveAndResizeAlojamientoListInDesktop);

const styles = [{
  width: 30,
  height: 30,
  className: "custom-clustericon-1",
},
  {
    width: 40,
    height: 40,
    className: "custom-clustericon-2",
  },
  {
    width: 50,
    height: 50,
    className: "custom-clustericon-3",
  },
];

const clusterStyles = [
  {
    textColor: 'white',
    url: iconCluster,
    height: 60,
    width: 60,
    anchorText:[0,-3]
  },
  {
    textColor: 'white',
    url: iconCluster,
    height: 60,
    width: 60,
    anchorText:[0,-3]
  },
  {
    textColor: 'white',
    url: iconCluster,
    height: 60,
    width: 60,
    anchorText:[0,-3]
  }
];

let map;

async function initMap() {
  let jsondata = await getAlojamientos();

  console.log(jsondata);

  let types = getInitTypes(jsondata);

  showTypeAlojamientos(types);

  const madrid = new google.maps.LatLng(40.4166802, -3.7055517);
  const mapOptions = {
    center: madrid,
    zoom: 5.2,
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  const divAlojamiento = document.getElementById('alojamiento-container');

  let clusterMarkers = [];

  jsondata.forEach((alojamiento, index) => {
    // add markers to the map
    const iconMarker = iconMarkerPng;
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(getLat(alojamiento), getLong(alojamiento)),
      map: map,
      title: alojamiento.title,
      //icon: iconMarker,
      customInfo: alojamiento,
    });
    let infoWindow = new google.maps.InfoWindow({
      content: `<div class="infowindow"><img class="pb-1 object-cover h-24 w-full" src="${alojamiento.foto}" alt="${alojamiento.title}">
                  <h4 class="text-gray-800 pb-2 font-bold">${alojamiento.title}</h4>
                  <div id="" class="alojamiento-rating-info-${index} flex items-center mb-4">
                    <svg id="star-0" class="mx-1 ml-0 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    <svg id="star-1" class="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    <svg id="star-2" class="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    <svg id="star-3" class="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                    <svg id="star-4" class="mx-1 w-4 h-4 fill-current text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
                  </div>
                  <p class="text-gray-800 pb-1">${alojamiento.direccion}</p>
                  <p class="text-gray-800">${alojamiento.localidad}</p>
                  <div class="flex justify-evenly items-center">
                        <a href="${alojamiento.como_llegar}" class="tracking-wide text-blue-500 text-xs hover:underline py-2 px-2 inline-flex items-center"><span class="mx-auto">Cómo llegar</span></a>
                        <a href="${alojamiento.web}" class="tracking-wide text-blue-500 text-xs hover:underline py-2 px-2 inline-flex items-center"><span class="mx-auto">Web</span></a>
                  </div>
                </div>`,
      maxWidth: 200,
    });
    // This event expects a click on a marker
    // When this event is fired the Info Window is opened.
    marker.addListener("click", () => {
      infoWindow.open(map, marker);
    });
    // Event that closes the Info Window with a click on the map
    google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
    });
    clusterMarkers.push(marker);
  });

  // group markers into clusters
  const imageCluster = iconCluster;
  let markerClusterer = new MarkerClusterer(map, clusterMarkers, {
    // imagePath: 'https://ccplugins.co/markerclusterer/images/m'
    styles: clusterStyles,
    clusterClass: "custom-clustericon",
  });


  map.addListener("bounds_changed", () => {
    let typesFromMarkers = [];
    const place = map.getCenter();
    let bounds = map.getBounds();
    // clean previous list, if exists
    cleanList();

    if(clusterMarkers.length < 1) {
      showIfListEmpty();
    }
    // get each marker from the clusterMarkers
    clusterMarkers.forEach((marker, index) => {
      if(bounds.contains(marker.getPosition())) {
        // get the brands
        typesFromMarkers.push(marker.customInfo.tipo);
        let json = null;
        // show the list
        showAlojamientoListFromData(index, marker);
        addStarsToList(index, marker.customInfo.puntuacion);
        addStarsToInfoWindow(index, marker.customInfo.puntuacion);
        // get and add distance to each element
        //let distance = getDistance(marker.getPosition(), place);
        //document.getElementsByClassName('alojamiento-info-distance-' + index)[0].textContent = distance + ' Km';
        // clean text distance when it´s 0
/*        if(document.getElementsByClassName('alojamiento-info-distance-' + index)[0].textContent === '0.00 Km') {
          document.getElementsByClassName('alojamiento-info-distance-' + index)[0].textContent = '';
        }*/

        // todo add coordinates, for click in the card and show in the map
        addCoordinates(map, index);}
    });

    typesFromMarkers = getTypes(typesFromMarkers);
    showTypeAlojamientos(typesFromMarkers);

    let alojamientoItems = document.querySelectorAll('.alojamientos-container div.alojamiento-info');
    animateAndFilter(alojamientoItems);
  });

  // create autocomplete Maps search
  const input = document.getElementById("search-input");
  let options = {
    types: ['geocode'],
    componentRestrictions: {country: "es"}
  };

  let autocomplete = new google.maps.places.Autocomplete(input, options);
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    // If the place has a geometry, then present it on a map.
    if(place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport, 120);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
  });

  //const locationButton = document.getElementById('btn-location');
  //setUserCurrentPosition(locationButton, map);
  let alojamientoItems = document.querySelectorAll('.alojamiento-container div.alojamiento-info');
  animateAndFilter(alojamientoItems);
}

// for webpack
window.initMap = initMap;
