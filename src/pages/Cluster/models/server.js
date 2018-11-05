import { queryServer } from '@/services/server';

export default {
  namespace: 'server',

  state: {
    list: [],
  },

  effects: {
    *fetchServers(_, { call, put }) {
      const response = yield call(queryServer);
      const data = response.data;
      yield put({
        type: 'getServers',
        payload: data,
      });
    },
    *fetchServerByType({ payload }, { call, put }) {
      const response = yield call(queryServer);
      const list = response.data;
      yield put({
        type: 'getServerByType',
        payload: {
          serverType: payload,
          list,
        }
      });
    },
  },

  reducers: {
    getServers(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    getServerByType(state, { payload }) {
      let newServerList = payload.list.filter(server => {
        if(server.type == payload.serverType) {
          return true;
        }
      })
      return {
        ...state,
        list: newServerList,
      }

    },
  },
};