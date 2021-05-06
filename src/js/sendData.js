import {modalClose} from "./modal";

class SendData {
  static init() {
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

export default SendData;
