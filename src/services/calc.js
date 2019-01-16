import request from '@/utils/request';
import setting from '@/defaultSettings';

export async function queryCalc() {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/calc`;
  return request(url, {
    method: 'GET',
  });
}

export async function addCalc(calc) {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/calc/add`;
  return request(url, {
    method: 'POST',
    body: {
      data: calc,
    },
  });
}
