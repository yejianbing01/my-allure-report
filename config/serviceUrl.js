const { REACT_APP_SERVICE_ENV } = process.env;

const url = {
  local: "http://localhost:6673/MBT",
  test: "http://192.168.0.123:6674/MBT",
  pre: "http://192.168.0.123:6673/MBT",
  production: "http://119.3.0.226:6673/MBT",
};

const serviceURL = url[REACT_APP_SERVICE_ENV || "local"];

module.exports = { serviceURL };
