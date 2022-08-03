const { REACT_APP_SERVICE_ENV } = process.env;

const url = {
  local: "http://localhost:6673",
  test: "http://192.168.0.123:6674",
  pre: "http://192.168.0.123:6673",
  production: "http://119.3.0.226:6673",
};

const serviceURL = url[REACT_APP_SERVICE_ENV || "local"];

module.exports = { serviceURL };
