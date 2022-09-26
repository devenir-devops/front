const axios = require("axios");

export const axios_instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  timeout: 4000,
});

