import request from '../utils/request';

import setting from '../common/setting';

export async function queryTest() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/test';
  return request(url, {
    method: 'GET',
  });
}

export async function queryMaster() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/mesos/api/v1';
  return request(url, {
    method: 'POST',
    body: {
      type: 'GET_MASTER',
    },
  });
}

export async function queryAgents() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/mesos/api/v1';
  const option = {
    method: 'POST',
    body: {
      type: 'GET_AGENTS',
    },
  };

  return request(url, option);
}

export async function queryFrameworks() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/mesos/frameworks';
  return request(url, {
    method: 'GET',
  });
}

export async function queryInstances() {
  const url = setting.mesos_ip + ':' + setting.mesos_port + '/instance';
  return request(url, {
    method: 'POST',
    body: {},
  });
}
