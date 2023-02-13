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

async function setRoleMember(params) {
  const res = axiosClient.post(url('set-role'), params);
  return res;
}

async function removeRoleMember(params) {
  const res = axiosClient.post(url('remove-role'), params);
  return res;
}

export { getListUser, createUser, setRoleMember, removeRoleMember };
