export function getLocalStorageToken() {
  return localStorage.getItem('token');
}

export function getLocalStorageUserId() {
  return localStorage.getItem('userId');
}

export function requestOptionsForAuthorizationFromStorage(method) {
  let token = getLocalStorageToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);

  return {
    method: method,
    headers: myHeaders,
  };
}

export function headersForAuthorizationFromStorage() {
  let token = getLocalStorageToken();
  let myHeaders = new Headers();
  myHeaders.append("Authorization", "Bearer " + token);
  return myHeaders;
}

export function validateLocalStorageToken(url = 'https://daw-wp-api.tk/wp-json/jwt-auth/v1/token/validate') {
  let requestOptions = requestOptionsForAuthorizationFromStorage('POST');

  return fetch(url, requestOptions)
    .then(response => response.json())
    .catch(error => console.log('error', error));
}

export function getNewToken(userName, password) {
  let formData = new FormData();
  formData.append("username", userName);
  formData.append("password", password);

  return {
    method: 'POST',
    body: formData,
  };
}

export function setRequestDataToLocalStorage(result) {
  const userLoginForm = document.getElementById('userLoginForm');
  console.log(result);
  if(result.statusCode === 200) {
    const token = result.data.token;
    const userEmail = result.data.email;
    const user = result.data.nicename;
    const userId = result.data.id;
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('user', user);
    localStorage.setItem('userId', userId);
    if(userLoginForm) {
      userLoginForm.reset();
    }
    if(window.location.pathname === '/login.html') {
      window.location.href = 'index.html';
    }
  } else {
    document.getElementById('errorDataLogin').classList.remove('hidden');
    document.querySelector('#errorDataLogin p').innerHTML = result.message;
  }
}

export function addUserRegisterToken() {

}
