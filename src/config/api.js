let host;

if (process.env.NODE_ENV === "development") {
  host = "http://localhost:5000";
} else {
  host = 'https://api.gagogroup.cn';
}

const baseUri = host + '/api';
export const API_CONFIG = {
  // base
  HOST: host,
  BASEURI: baseUri,

  // user: '/user_info',
  USER: '/user_info',
  FEATURES: '/navs',
  LOGIN: '/login',
  SIGNUP: '/signup',

  // dashboard
  LAND: '/land',

};
