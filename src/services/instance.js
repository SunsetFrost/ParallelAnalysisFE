import request from '../utils/request';
import setting from '../common/setting';

export async function queryInstance() {
  const url = setting.master.ip + ':' + setting.master.port + '/instance';
  return request(url, {
    method: 'GET',
  });
}

export async function createInstance(task) {
  const url = setting.master.ip + ':' + setting.master.port + '/instance';
  return request(url, {
    method: 'POST',
    body: {
      task: task,
    },
  });
}
