import axios from 'axios';
import ENDPOINTS from '../constants/endpoins';

export const api = axios.create({
  baseURL: ENDPOINTS.BASE_URL,
});
