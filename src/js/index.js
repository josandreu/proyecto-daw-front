import '../sass/main.scss'
import DisplayError from "./form";
import Modal from "./modal";

window.addEventListener("load", function(event) {
  DisplayError.init();
});

document.addEventListener("DOMContentLoaded", function(event) {
  Modal.init();
});

