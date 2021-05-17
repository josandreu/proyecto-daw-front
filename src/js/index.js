import '../sass/main.scss'
import SendData from "./sendData";
import Modal from "./components/modal";
import Search from "./components/search";
import './maps';
import './components/tabs'

import gpsIcon from '../images/gps.svg';
import gpsIcon2 from '../images/gps2.svg';

window.addEventListener("load", function(event) {
  SendData.init();
});

document.addEventListener("DOMContentLoaded", function(event) {
  Modal.init();
  Search.init();
});

