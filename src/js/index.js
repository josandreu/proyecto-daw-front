import '../sass/main.scss'
import SendData from "./sendData";
import Modal from "./modal";

window.addEventListener("load", function(event) {
  SendData.init();
});

document.addEventListener("DOMContentLoaded", function(event) {
  Modal.init();
});

