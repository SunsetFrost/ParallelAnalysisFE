import { queryServers, queryInstance, queryAgentLog } from '../services/api';

export default {
  namespace: 'server',

  state: {
    list: [],
  },

  effects: {
    *fetchServer(_, { call, put }) {
      const response = yield call(queryServers);
      yield put({
        type: 'getList',
        payload: response,
      });
    },
    *fetchInstance(_, { call, put }) {
      const response = yield call(queryInstance);
      yield put({
        type: 'getInstance',
        payload: response,
      });
    },
    *fetchAgentLog(_, { call, put }) {
      const response = yield call(queryAgentLog);
      yield put({
        type: 'getAgentLog',
        payload: response,
      });
    },
  },

  reducers: {
    getList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    getInstance(state, { payload }) {
      return {
        ...state,
        instance: payload,
      };
    },
    getAgentLog(state, { payload }) {
      return {
        ...state,
        agentlog: payload,
      };
    },
  },
};
