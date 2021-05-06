import {modalClose} from "./modal";

class DisplayError {
  static init() {
    //document.getElementById('button').addEventListener('click', toggleError);
    sendData();
  }
}

function sendData() {
  document.getElementById('insertAlojForm').addEventListener('submit',async function(e) {
    e.preventDefault();

    addLoader();

    modalClose();

    const formData = new FormData(this);
    let myHeaders = new Headers();

    myHeaders.append("Authorization", "Basic am9zYW5kcmV1OkBaaDIyZyVCcU9JWSFUUDdsag==");
    myHeaders.append("Cookie", "XDEBUG_SESSION=PHPSTORM");

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      redirect: 'follow',
      body: formData
    };

    fetch('http://127.0.0.1/wp-json/api/v1/crear-alojamiento', requestOptions).then(response => response.text())
      .then(result => console.log(result))
      .then(document.getElementById('insertAlojForm').reset())
      .then(removeLoader)
      .catch(error => console.log('error', error));
  })
}

function addLoader() {
  document.getElementById('loader').classList.remove('hidden');
}

function removeLoader() {
  document.getElementById('loader').classList.add('hidden');
}

function toggleError() {
  const errMessages = document.querySelectorAll('#error');
  // Show error message
  errMessages.forEach((el) => {
    el.classList.toggle('hidden');
  })

  // Highlight input and label with red
  const allBorders = document.querySelectorAll('.border-gray-200');
  const allTexts = document.querySelectorAll('.text-gray-500');
  allBorders.forEach((el) => {
    el.classList.toggle('border-red-600');
  })
  allTexts.forEach((el) => {
    el.classList.toggle('text-red-600');
  })
}


export default DisplayError;
