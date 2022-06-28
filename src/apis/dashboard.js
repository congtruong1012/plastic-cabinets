import axiosClient from 'apis';

const url = (path) => `/sys/order/${path}`;

async function getDashboard(params) {
  const res = axiosClient.get(url('dashboard'), { params });
  return res;
}

async function getNewestOrder() {
  const res = axiosClient.get(url('newest-order'));
  return res;
}

export { getDashboard, getNewestOrder };
