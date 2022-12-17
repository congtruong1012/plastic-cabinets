import axiosClient from 'apis';

const url = (path) => `/api/sys/product/${path}`;

async function getListProduct(params) {
  const res = axiosClient.get(url('list'), { params });
  return res;
}

async function getDetailProduct(id) {
  const res = axiosClient.get(url('detail'), { id });
  return res;
}

async function creUpdProduct(body) {
  const res = axiosClient.post(url('cre-upd'), body);
  return res;
}

async function deleteProduct(id) {
  const res = axiosClient.post(url('delete'), { id });
  return res;
}

export { getListProduct, getDetailProduct, creUpdProduct, deleteProduct };
