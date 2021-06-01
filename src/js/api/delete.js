import {headersForAuthorizationFromStorage} from "./utils";

export async function deleteAlojamiento(id) {
  const requestOptions = optionsData();
  return fetch(`https://www.proyecto-wp-api.tk/wp-json/api/v1/eliminar-alojamiento/${id}`, requestOptions);
}

export function setAlojamientoDeleteEvent(deleteAlojamientosContainers) {
  deleteAlojamientosContainers.forEach(container => {
    container.addEventListener('click', function() {
      addLoader(); // loader
      deleteAlojamiento(this.children[0].textContent)
        .then(result => console.log(result))
        .then(removeLoader)
        .then(window.location.reload.bind(window.location));
    });
  })
}

function optionsData() {
  let myHeaders = headersForAuthorizationFromStorage();

  return {
    method: 'DELETE',
    headers: myHeaders
  };
}

function addLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

function removeLoader() {
  document.getElementById('loader').classList.add('hidden');
}
