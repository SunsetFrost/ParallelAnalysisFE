import request from '@/utils/request';
import setting from '@/defaultSettings';

export async function queryNet() {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/net`;
  return request(url, {
    method: 'GET',
  });
}

export async function testNet() {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/net`;
  return request(url, {
    method: 'GET',
  });
}
