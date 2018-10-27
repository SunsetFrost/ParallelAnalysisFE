import { queryServer } from '../services/server';
import _ from 'lodash';

export default {
  namespace: 'cluster',

  state: {
    list: [],
  },

  effects: {
    *fetchServers(_, { call, put }) {
      const response = yield call(queryServer);
      yield put({
        type: 'getServers',
        payload: response,
      });
    },
    *fetchServerByType({ payload }, { call, put }) {
      const response = yield call(queryServer);
      const list = response.data;
      yield put({
        type: payload,
        list,
      });
    },
  },

  reducers: {
    getServers(state, { payload }) {
      return {
        ...state,
        list: payload.data,
      };
    },
    getServerByType(state, { payload }) {
      let newServerList = [];
      for (const server of payload.list) {
        if (server.type === payload.type) {
          newServerList.push(server);
        }
      }
      state.list = newServerList;
      return {
        ...state,
      };
    },
  },
};
