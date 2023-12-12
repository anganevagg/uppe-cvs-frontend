import { Axios } from 'axios';

export const serviceNoAuth = new Axios({
  baseURL: process.env.BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
