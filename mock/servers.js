export const getServers = (req, res) => {
  res.json([
    {
      id: '0001',
      name: 'MasterSaber',
      desc: 'management server to distribute task and control agent server',
      group: 'IBIS',
      startTime: '2018-04-18 12:21',
      status: 'success',
      ip: '172.10.10.23',
    },
    {
      id: '0002',
      name: 'ElectAssasin',
      desc: 'elect new management server if ordinary management server down',
      group: 'IBIS',
      startTime: '2018-04-18 12:21',
      status: 'processing',
      ip: '172.10.10.23',
    },
    {
      id: '0003',
      name: 'AgentCaster',
      desc: 'worker server to do calculate job',
      group: 'IBIS',
      startTime: '2018-04-18 12:21',
      status: 'success',
      ip: '172.10.10.23',
    },
    {
      id: '0004',
      name: 'AgentBerserker',
      desc: 'worker server to do calculate job',
      group: 'IBIS',
      startTime: '2018-04-18 12:21',
      status: 'success',
      ip: '172.10.10.23',
    },
    {
      id: '0005',
      name: 'AgentArcher',
      desc: 'worker server to do calculate job',
      group: 'IBIS',
      startTime: '2018-03-13 12:21',
      status: 'processing',
      ip: '172.10.10.23',
    },
  ]);
};

export const getInstance = (req, res) => {
  res.json([
    {
      id: '0001',
      group: 'IBIS',
      cpu: '3.2',
      agent: '3',
      status: '90',
    },
    {
      id: '0002',
      group: 'BIOME',
      cpu: '2.1',
      agent: '1',
      status: '30',
    },
    {
      id: '0003',
      group: 'LPJ',
      cpu: '4.2',
      agent: '2',
      status: '80',
    },
    {
      id: '0004',
      group: 'IBIS',
      cpu: '1.6',
      agent: '1',
      status: '10',
    },
    {
      id: '0005',
      group: 'IBIS',
      cpu: '2.7',
      agent: '2',
      status: '40',
    },
    {
      id: '0006',
      group: 'BIOME',
      cpu: '3.0',
      agent: '1',
      status: '70',
    },
    {
      id: '0007',
      group: 'IBIS',
      cpu: '2.5',
      agent: '2',
      status: '5',
    },
    {
      id: '0008',
      group: 'LPJ',
      cpu: '3.0',
      agent: '3',
      status: '100',
    },
  ]);
};

export const getAgentLog = [
  {
    id: 'log1',
    date: '2018-04-18',
    name: 'AgentLancer',
    action: 'add',
    desc: 'admin operate',
    group: 'IBIS',
  },
  {
    id: 'log2',
    date: '2018-04-27',
    name: 'AgentX',
    action: 'remove',
    desc: 'error',
    group: 'IBIS',
  },
  {
    id: 'log3',
    date: '2018-03-22',
    name: 'AgentSaber',
    action: 'add',
    desc: 'admin operate',
    group: 'IBIS',
  },
  {
    id: 'log4',
    date: '2018-04-18',
    name: 'AgentLancer',
    action: 'add',
    desc: 'admin operate',
    group: 'IBIS',
  },
  {
    id: 'log5',
    date: '2018-04-18',
    name: 'AgentLancer',
    action: 'add',
    desc: 'admin operate',
    group: 'IBIS',
  },
  {
    id: 'log6',
    date: '2018-04-18',
    name: 'AgentLancer',
    action: 'add',
    desc: 'admin operate',
    group: 'IBIS',
  },
];

export default {
  getServers,
};
