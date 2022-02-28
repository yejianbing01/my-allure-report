const { REACT_APP_SERVICE_ENV } = process.env;

const url = {
  local: "http://localhost:6673/MBT",
  dev: "http://192.168.0.123:6674/MBT",
  pre: "http://localhost:6673/MBT",
};

export const serviceURL = url[REACT_APP_SERVICE_ENV || "local"];
