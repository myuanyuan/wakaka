import { 
  USER,
  FEATURES
} from './../constants/actionTypes';

import cFetch from './../utils/cFetch';
import { API_CONFIG } from './../config/api';

export const fetchUser = () => {
  return {
    type: USER,
    payload: cFetch(API_CONFIG.user, { method: "GET" })
  };
};

export const fetchFeatures = () => {
  return {
    type: FEATURES,
    payload: cFetch(API_CONFIG.FEATURES, { method: "GET" })
  };
};