import axiosClient from 'apis';

const url = (path) => `/api/user/${path}`;

async function getListUser(params) {
  const res = axiosClient.get(url('list'), { params });
  return res;
}

async function createUser(params) {
  const res = axiosClient.post(url('create'), params);
  return res;
}

export { getListUser, createUser };
