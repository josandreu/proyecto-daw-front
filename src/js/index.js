import '../sass/main.scss'
import SendData from './sendData';
import Modal from './components/modal';
import Search from './components/search';
import './maps';
import './components/tabs'
import {addEventTabs} from './components/tabs';
import Login from "./login";
import Routing from "./routing";
import Register from "./register";
import colorsBg from '../images/colors-bg.jpeg';

window.addEventListener('load', function(event) {
  SendData.init();
});

document.addEventListener('DOMContentLoaded', function(event) {
  Routing.init();
  Register.init();
  Login.init();
  Modal.init();
  Search.init();
  addEventTabs();
  document.getElementById('colors-bg').src = colorsBg;
});

window.onresize = addEventTabs;

