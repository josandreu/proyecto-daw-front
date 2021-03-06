import {modalClose} from "../components/modal";
import {toggleError} from "../utils/errors";
import {headersForAuthorizationFromStorage} from "./utils";

class SendData {
  static init() {
    sendData();
  }
}

function sendData() {
  const form = document.getElementById('insertAlojForm');
  if(form) {
    form.addEventListener('submit',async function(e) {
      e.preventDefault();

      const postTitle = document.getElementById('post-title');
      const direccion = document.getElementById('direccion');
      const localidad = document.getElementById('localidad');
      const coordenadas = document.getElementById('coordenadas');
      const web = document.getElementById('web');
      const comoLlegar = document.getElementById('como-llegar');

      const data = [postTitle, direccion, localidad, coordenadas, web, comoLlegar];

      // si alguno de los campos del form no está completado no envía el formulario
      if(!toggleError(data)) {
        addLoader(); // loader

        modalClose(); // cierra modal

        // envío de los datos por POST
        const formData = new FormData(this);
        const requestOptions = optionsData(formData);
        fetchData(requestOptions);
      }
      return false;
    })
  }
}

function fetchData(requestOptions, url = 'https://daw-wp-api.tk/wp-json/api/v1/crear-alojamiento') {
  fetch(url, requestOptions).then(response => response.text())
    .then(result => console.log(result))
    .then(document.getElementById('insertAlojForm').reset())
    .then(removeLoader)
    .then(window.location.reload.bind(window.location))
    .catch(error => console.log('error', error));
}

function optionsData(data) {
  let myHeaders = headersForAuthorizationFromStorage();

  return {
    method: 'POST',
    headers: myHeaders,
    redirect: 'follow',
    body: data
  };
}

function addLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

function removeLoader() {
  document.getElementById('loader').classList.add('hidden');
}

export default SendData;
