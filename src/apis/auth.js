import axiosClient from 'apis';

const url = (path) => `/auth/${path}`;

async function login(params) {
  const res = axiosClient.post(url('login'), params);
  return res;
}

async function checkLogged() {
  const res = axiosClient.get(url('check-logged'));
  return res;
}

async function refreshToken() {
  const res = axiosClient.get(url('refresh-token'));
  return res;
}

async function logout() {
  const res = axiosClient.get(url('logout'));
  return res;
}

export { login, checkLogged, refreshToken, logout };
