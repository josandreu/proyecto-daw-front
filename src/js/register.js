import {toggleError} from "./utils/errors";
import {requestOptionsForAuthorizationFromStorage} from "./api/utils";

class Register {
  static init() {
    getRegisterData();
  }
}

function getRegisterData() {
  const registerForm = document.getElementById('userRegisterForm');
  if(registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const data = [];
      const userName = document.getElementById('name')
      data.push(userName);
      const password = document.getElementById('password');
      data.push(password);
      const email = document.getElementById('email');
      data.push(email);

      if(!toggleError(data)) {
        const userNameText = document.getElementById('name').value;
        const passwordText = document.getElementById('password').value;
        const emailText = document.getElementById('email').value;
        createUser({'userNameText': userNameText, 'passwordText': passwordText, 'emailText': emailText});
      }
    })
  }
}

function createUser({userNameText, passwordText, emailText}, url = 'https://daw-wp-api.local/wp-json/wp/v2/users') {
  let requestOptions = requestOptionsForAuthorizationFromStorage('POST');
  fetch(`${url}?username=${userNameText}&password=${passwordText}&email=${emailText}`, requestOptions)
    .then(result => {
      if(result.ok) {
        document.getElementById('userRegisterForm').reset();
        document.getElementById('okDataLogin').classList.remove('hidden');
        document.querySelector('#okDataLogin p').innerHTML = '<span class="text-lg font-bold">¡Registro creado correctamente!<span><br><span class="text-lg font-bold">Ahora será redirigido a la página de login...<span>';
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 3000);
      } else {
        document.getElementById('errorDataLogin').classList.remove('hidden');
        document.querySelector('#errorDataLogin p').innerHTML = result.message;
      }
    })
}

export default Register;
