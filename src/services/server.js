import request from '@/utils/request';
import setting from '@/defaultSettings';

export async function queryServer() {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/server`;
  return request(url, {
    method: 'GET',
  });
}

export async function tempServer() {
  const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/server`;
  return request(url, {
    method: 'GET',
  });
}
