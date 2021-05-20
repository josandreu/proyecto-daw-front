import {getLocalStorageToken, getLocalStorageUserId} from "../login";

export function optionsForAuthorizationFromStorage(method) {
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

export function validateLocalStorageToken() {
  let requestOptions = optionsForAuthorizationFromStorage('POST');

  return fetch("https://daw-wp-api.local/wp-json/jwt-auth/v1/token/validate", requestOptions)
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
    redirect: 'follow'
  };
}
