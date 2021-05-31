import '../sass/main.scss'
import Modal from './components/modal';
import Search from './components/search';
import './maps';
import './components/tabs'
import {addEventTabs} from './components/tabs';
import SendData from './api/sendData';
import Login from './api/login';
import Routing from "./routing";
import Register from "./api/register";
import colorsBg from '../images/colors-bg.jpeg';
import logo from '../images/logo.png'
import geoLogo from '../images/gps2.svg';
const logoImg = document.getElementById('logo');
const background = document.getElementById('colors-bg');
const imgGeo = document.getElementById('geolocation-icon');

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
  if(background) background.src = colorsBg;
  if(logoImg) logoImg.src = logo;
  if(imgGeo) imgGeo.src = geoLogo;
});

window.onresize = addEventTabs;

