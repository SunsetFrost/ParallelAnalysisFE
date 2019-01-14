import { queryNet } from '@/services/net';

export default {
  namespace: 'net',

  state: {
    list: [],
  },

  effects: {
    *fetchNets(_, { call, put }) {
      const { data } = yield call(queryNet);
      yield put({
        type: 'getNets',
        payload: data,
      });
    },
  },

  reducers: {
    getNets(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};
