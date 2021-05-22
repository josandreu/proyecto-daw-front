import {toggleError} from "./utils/errors";
import {getNewToken, setRequestDataToLocalStorage} from "./api/utils";

class Login {
  static init() {
    //checkLocalStorageToken();
    logOut();
    getUserData();
  }
}

/*function checkLocalStorageToken() {
  // si estamos en el mapa
  if(window.location.pathname !== '/login.html' && window.location.pathname !== '/registro.html') {
    // si no existe
    if(localStorage.getItem('token') === null) {
      window.location.href = 'login.html';
  } else {
      // si existe chequeamos el valor guardado y vemos si es correcto con /validate, de no ser así redirigimos
      validateIndex();
    }
  } else {
    // si estamos en login
    if(localStorage.getItem('token') !== null) {
      validateLogin();
    }
  }
}*/

function getUserData() {
  const loginForm = document.getElementById('userLoginForm');
  if(loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const data = [];
      const userName = document.getElementById('user')
      const userNameText = document.getElementById('user').value;
      data.push(userName);
      const passwordText = document.getElementById('password').value;
      const password = document.getElementById('password');
      data.push(password);

      if(!toggleError(data)) {
        const requestOptions = getNewToken(userNameText, passwordText);
        fetch("https://daw-wp-api.local/wp-json/jwt-auth/v1/token", requestOptions)
          .then(result => result.json())
          .then(result => setRequestDataToLocalStorage(result))
          .catch(function(error) {
            document.getElementById('errorDataLogin').classList.remove('hidden');
            console.log('error', error);
          });
      }
    })
  }
}


function logOut() {
  let button = document.getElementById('buttonLogOut');
  if(button) {
    button.addEventListener('click', () => {
      localStorage.clear();
      window.location.href = 'login.html';
    });
  }
}

export default Login;
