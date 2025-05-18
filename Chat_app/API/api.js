// utils/api.js
import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://192.168.10.16:3000/', // ⚠️ Replace with LAN IP for mobile
});
