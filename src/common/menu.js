import { isUrl } from '../utils/utils';

const menuData = [
  {
    name: 'Home',
    icon: 'home',
    path: 'home',
  },
  {
    name: 'Cluster Server',
    icon: 'laptop',
    path: 'cluster',
    children: [
      {
        name: 'Server',
        path: 'server',
      },
      {
        name: 'Instance',
        path: 'instance',
      },
      {
        name: 'Log',
        path: 'log',
      },
    ],
  },
  {
    name: 'Data Center',
    icon: 'hdd',
    path: 'datacenter',
    children: [
      {
        name: 'Service',
        path: 'list',
      },
      {
        name: 'Download',
        path: 'detail',
      },
    ],
  },
  {
    name: 'Notebook',
    icon: 'profile',
    path: 'notebook',
    children: [
      {
        name: 'DataAnalysis',
        path: 'dataanalysis',
      },
      {
        name: 'DataProcess',
        path: 'dataprocess',
      },
      {
        name: 'CompareReport',
        path: 'report',
      },
    ],
  },
];

function formatter(data, parentPath = '/', parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
