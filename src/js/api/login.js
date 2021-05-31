import {toggleError} from "../utils/errors";
import {getNewToken, setRequestDataToLocalStorage} from "./utils";

class Login {
  static init() {
    logOut();
    getUserData();
  }
}

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
        fetch("https://daw-wp-api.tk/wp-json/jwt-auth/v1/token", requestOptions)
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
