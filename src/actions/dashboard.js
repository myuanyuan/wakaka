import { 
  LAND
} from './../constants/actionTypes';

import cFetch from './../utils/cFetch';
import { API_CONFIG } from './../config/api';

export const fetchLandInfo = (params) => {
  return {
    type: LAND,
    payload: cFetch(API_CONFIG.LAND, { method: "GET", params: params })
  };
};