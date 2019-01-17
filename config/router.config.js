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
            name: '网络详情',
            component: './Cluster/NetDetail',
            hideInMenu: true,
          },
          {
            path: '/cluster/net-create',
            name: '网络创建',
            component: './Cluster/NetCreate',
            hideInMenu: true,
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/cluster/net-create',
                redirect: '/cluster/net-create/net-cfg',
              },
              {
                path: '/cluster/net-create/net-cfg',
                name: 'NetConfig',
                component: '/Cluster/NetCreate/Step1',
              },
              {
                path: '/cluster/net-create/switch-cfg',
                name: 'SwitchConfig',
                component: '/Cluster/NetCreate/Step2',
              },
              {
                path: '/cluster/net-create/result',
                name: 'Result',
                component: '/Cluster/NetCreate/Step3',
              },
            ],
          },
          {
            path: '/cluster/data',
            name: '数据',
            component: './Cluster/Data',
          },
          {
            path: '/cluster/data-detail',
            name: '数据详情',
            component: './Cluster/DataDetail',
            hideInMenu: true,
          },
          {
            path: '/cluster/calc',
            name: '计算',
            component: './Cluster/Calc',
          },
          {
            path: '/cluster/calc-detail',
            name: '计算详情',
            component: './Cluster/CalcDetail',
            hideInMenu: true,
          },
        ],
      },
      {
        path: '/parallel',
        icon: 'radar-chart',
        name: '并行',
        routes: [
          {
            path: '/parallel/instance',
            name: '任务',
            component: './Parallel/Instance',
          },
          {
            path: '/parallel/instance-detail',
            name: 'InstanceDetail',
            component: './Parallel/InstanceDetail',
            hideInMenu: true,
          },
          {
            path: '/parallel/create',
            name: '创建',
            component: './Parallel/CreateInstance',
            hideChildrenInMenu: true,
            routes: [
              {
                path: '/parallel/create',
                redirect: '/parallel/create/model-cfg',
              },
              {
                path: '/parallel/create/model-cfg',
                name: 'ModelConfig',
                component: '/Parallel/CreateInstance/Step1',
              },
              {
                path: '/parallel/create/parall-cfg',
                name: 'ParallConfig',
                component: '/Parallel/CreateInstance/Step2',
              },
              {
                path: '/parallel/create/result',
                name: 'Result',
                component: '/Parallel/CreateInstance/Step3',
              },
            ],
          },
        ],
      },
      // data
      {
        path: '/data',
        icon: 'hdd',
        name: '数据',
        component: './Data/List',
      },
      {
        path: '/data-detail',
        name: '数据详情',
        component: './Data/Detail',
        hideInMenu: true,
      },
      // log
      {
        path: '/log',
        icon: 'calendar',
        name: '日志',
        component: './Log/Log',
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
