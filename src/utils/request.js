import axios from "axios";
import { serviceURL } from "../../config";

// const requestConfig = {
//   baseURL: serviceURL,
//   timeout: 10000,
//   // proxy: {
//   //   host: '127.0.0.1',
//   //   port: 9000,
//   //   auth: {
//   //     username: 'mikeymike',
//   //     password: 'rapunz3l'
//   //   }
//   // },
// };

axios.defaults.timeout = 10000;

export function post(queryString) {
  return axios
    .post(serviceURL, { query: queryString })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}

export function get(queryString) {
  return axios
    .get(serviceURL, { query: queryString })
    .then((res) => res.data)
    .catch((error) => console.log(error));
}
