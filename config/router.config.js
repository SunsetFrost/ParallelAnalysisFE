export default [
  // user
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      { path: '/user', redirect: '/user/login' },
      { path: '/user/login', component: './User/Login' },
      { path: '/user/register', component: './User/Register' },
      { path: '/user/register-result', component: './User/RegisterResult' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    Routes: ['src/pages/Authorized'],
    authority: ['admin', 'user'],
    routes: [
      // home
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        icon: 'home',
        name: '监控',
        component: './Home/Home',
      },
      // cluster
      {
        path: '/cluster',
        icon: 'cluster',
        name: '集群',
        routes: [
          {
            path: '/cluster/net',
            name: '网络',
            component: './Cluster/Net',
          },
          {
            path: '/cluster/net-detail',
            name: 'NetDetail',
            component: './Cluster/NetDetail',
            hideInMenu: true,
          },
          {
            path: '/cluster/data',
            name: '数据',
            component: './Cluster/Data',
          },
          {
            path: '/cluster/calc',
            name: '计算',
            component: './Cluster/Calc',
          },
          {
            path: '/cluster/server',
            name: 'Server',
            component: './Cluster/Server',
          },
          {
            path: '/cluster/instance',
            name: 'Instance',
            component: './Cluster/Instance',
          },
          {
            path: '/cluster/instance-detail',
            name: 'InstanceDetail',
            component: './Cluster/InstanceDetail',
            hideInMenu: true,
          },
          {
            path: '/cluster/log',
            name: 'Log',
            component: './Cluster/Log',
          },
          {
            path: '/cluster/create',
            name: 'CreateInstance',
            component: './Cluster/CreateInstance',
            hideInMenu: true,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/cluster/create',
                redirect: '/cluster/create/model-cfg',
              },
              {
                path: '/cluster/create/model-cfg',
                name: 'ModelConfig',
                component: '/Cluster/CreateInstance/Step1',
              },
              {
                path: '/cluster/create/parall-cfg',
                name: 'ParallConfig',
                component: '/Cluster/CreateInstance/Step2',
              },
              {
                path: '/cluster/create/result',
                name: 'Result',
                component: '/Cluster/CreateInstance/Step3',
              },
            ],
          },
        ],
      },
      {
        path: '/parallel',
        icon: 'radar-chart',
        name: '并行',
      },
      // data
      {
        path: '/data',
        icon: 'hdd',
        name: '数据',
        routes: [
          {
            path: '/data/list',
            name: 'Service',
            component: './Data/List',
          },
          {
            path: '/data/detail',
            name: 'Detail',
            component: './Data/Detail',
          },
        ],
      },
      {
        path: '/log',
        icon: 'calendar',
        name: '日志',
      },
      // tool
      {
        path: '/tool',
        icon: 'tool',
        name: '分析',
      },
      {
        component: '404',
      },
    ],
  },
];
