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
      //home
      { path: '/', redirect: '/home' },
      {
        path: '/home',
        icon: 'home',
        name: 'Home',
        component: './Home/Home',
      },
      //cluster
      {
        path: '/cluster',
        icon: 'laptop',
        name: 'Cluster',
        routes: [
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
            path: '/cluster/log',
            name: 'Log',
            component: './Cluster/Log',
          },
        ],
      },
      //data
      {
        path: '/data',
        icon: 'hdd',
        name: 'Data',
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
      // tool
      {
        path: '/tool',
        icon: 'profile',
        name: 'Tool',
        routes: [
          {
            path: '/tool/data-process',
            name: 'DataProcess',
            component: './Tool/DataProcess',
          },
          {
            path: '/tool/data-analysis',
            name: 'DataAnalysis',
            component: './Tool/DataAnalysis',
          },
          {
            path: '/tool/jupyter',
            name: 'Jupyter',
            component: './Tool/Jupyter',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
