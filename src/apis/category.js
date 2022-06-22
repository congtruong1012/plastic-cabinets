import axiosClient from 'apis';

const url = (path) => `/sys/category/${path}`;

async function getListCategory(params) {
  const res = axiosClient.get(url('list'), { params });
  return res;
}

async function getDetailCategory(id) {
  const res = axiosClient.get(url('detail'), { id });
  return res;
}

async function creUpdCategory(body) {
  const res = axiosClient.post(url('cre-upd'), body);
  return res;
}

async function deleteCategory(id) {
  const res = axiosClient.post(url('delete'), { id });
  return res;
}

export { getListCategory, getDetailCategory, creUpdCategory, deleteCategory };
