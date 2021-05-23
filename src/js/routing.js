import {getNewToken, setRequestDataToLocalStorage, validateLocalStorageToken} from "./api/utils";

class Routing {
  static init() {
    checkLocalStorageToken();
  }
}

function checkLocalStorageToken() {
  // si estamos en el mapa
  if(window.location.pathname === '/index.html') {
    // si no existe
    if(localStorage.getItem('token') === null) {
      window.location.href = 'login.html';
    } else if(localStorage.getItem('userEmail') === 'create.users.daw@gmail.com') {
      localStorage.clear();
      window.location.href = 'login.html';
    } else {
      // si existe chequeamos el valor guardado y vemos si es correcto con /validate, de no ser así redirigimos
      validateIndex();
    }
  } else if(window.location.pathname === '/login.html') {
    // si estamos en login
    if(localStorage.getItem('token') !== null) {
      validateLogin();
    }
  } else if(window.location.pathname === '/registro.html') {
    loginCreateUser();
  }
}

function validateIndex(loginUrl = 'login.html') {
  validateLocalStorageToken().then(function(response){
    if(response.statusCode !== 200) {
      window.location.href = loginUrl;
    } else {
      console.log('OK');
    }
  })
}

function validateLogin() {
  validateLocalStorageToken().then(function(response){
    if(response.statusCode !== 200) {
      localStorage.clear();
    } else {
      console.log('OK');
    }
  })
}

function loginCreateUser(pass = 'DldV iYaO S0ma ESSc eakP ahPO', user = 'create.users.daw@gmail.com', url = 'https://daw-wp-api.tk/wp-json/jwt-auth/v1/token') {
  localStorage.clear();
  const requestOptions = getNewToken(user, pass);
  fetch(url, requestOptions)
    .then(result => result.json())
    .then(result => setRequestDataToLocalStorage(result))
    .catch(function(error) {
      document.getElementById('errorDataLogin').classList.remove('hidden');
      console.log('error', error);
    });
}

export default Routing;
