import { stringify } from 'qs';

import request from '@/utils/request';
import setting from '@/defaultSettings';

export async function queryNetByParam(param) {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/net?${stringify(param)}`;
  return request(url, {
    method: 'GET',
  });
}

export async function queryNetById(id) {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/net/${id}`;
  return request(url, {
    method: 'GET',
  });
}

export async function addNet(net) {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/net/add`;
  return request(url, {
    method: 'POST',
    body: {
      data: net,
    },
  });
}

export async function updateNet(net) {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/net/update`;
  return request(url, {
    method: 'POST',
    body: {
      data: net,
    },
  });
}

export async function addPC(params) {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/net/pc/add`;
  return request(url, {
    method: 'POST',
    body: {
      data: {
        ...params,
      },
    },
  });
}

export async function updatePC(id, pc) {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/net/pc/update`;
  return request(url, {
    method: 'POST',
    body: {
      data: {
        id,
        pc,
      },
    },
  });
}
