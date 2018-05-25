import request from '../utils/request';

import setting from '../common/setting';

export async function getTest() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/test';
  return request(url, {
    method: 'GET',
  });
}

export async function getMaster() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/api/v1';
  return request(url, {
    method: 'POST',
    body: {
      type: 'GET_MASTER',
    },
  });
}

export async function getAgents() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/api/v1';
  const option = {
    method: 'POST',
    body: {
      type: 'GET_AGENTS',
    },
  };

  return request(url, option);
}

export async function getFrameworks() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/frameworks';
  return request(url, {
    method: 'GET',
  });
}
