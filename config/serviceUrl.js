const { REACT_APP_SERVICE_ENV } = process.env;

const url = {
  local: "http://localhost:6673/MBT",
  test: "",
  pre: "",
  production: "",
};

const serviceURL = url[REACT_APP_SERVICE_ENV || "local"];

module.exports = { serviceURL };
