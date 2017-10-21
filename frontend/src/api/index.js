import axios from "axios";
import {
  BASE_URL,
  USER_ROUTE,
  REGISTER_ROUTE,
  PAGE_ROUTE,
  PAGE_LIST_ROUTE,
  LOGIN_ROUTE,
  UPLOAD_ROUTE
} from "./constants";
import querystring from "querystring";

function getPage(userID, pageID) {
  return axios.get(
    BASE_URL + USER_ROUTE + `/${userID}` + PAGE_ROUTE + `/${pageID}`
  );
}

function getPageList(count, offset) {
  return axios.get(BASE_URL + PAGE_LIST_ROUTE + `/${count}` + `/${offset}`);
}

function postRegister(accessCode, email, password, username) {
  const urlEncodedData = querystring.stringify({
    accessCode,
    email,
    password,
    username
  });

  return axios.post(BASE_URL + REGISTER_ROUTE, urlEncodedData);
}

function postLogin(key, password) {
  const urlEncodedData = querystring.stringify({
    key,
    password
  });

  return axios.post(BASE_URL + LOGIN_ROUTE, urlEncodedData);
}

/*Upload does not accept author.*/
function postUpload(title, body) {
  const urlEncodedData = querystring.stringify({
    name,
    body
  });

  return axios.post(BASE_URL + UPLOAD_ROUTE, urlEncodedData);
}

// function postPageList(name, body) {
//   Cookies.set("session", "", { expires: 365 });

//   return axios.post(
//     `${BASE_URL}${PAGE_ROUTE}/new`,
//     {
//       name,
//       body
//     },
//     {
//       withCredentials: true
//     }
//   );
// }

export default { getPage, getPageList, postRegister, postLogin, postUpload };
