import axiosClient from 'apis';

const url = (path) => `/api/sys/order/${path}`;

async function getTurnover(params) {
  const res = axiosClient.get(url('turnover'), { params });
  return res;
}

async function getDashboard(params) {
  const res = axiosClient.get(url('dashboard'), { params });
  return res;
}

async function getNewestOrder() {
  const res = axiosClient.get(url('newest-order'));
  return res;
}

async function getListOrder(params) {
  const res = axiosClient.get(url('list'), { params });
  return res;
}

async function confirmOrder(params) {
  const res = axiosClient.post(url('confirm'), params);
  return res;
}

async function cancelOrder(params) {
  const res = axiosClient.post(url('cancel'), params);
  return res;
}

async function deliverOrder(params) {
  const res = axiosClient.post(url('deliver'), params);
  return res;
}

export { getTurnover, getDashboard, getNewestOrder, getListOrder, confirmOrder, cancelOrder, deliverOrder };
