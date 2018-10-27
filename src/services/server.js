import request from '../utils/request';
import setting from '../common/setting';

export async function queryServer() {
  const url = `${setting.master.ip}:${setting.master.port}/server`;
  return request(url, {
    method: 'GET',
  });
}
