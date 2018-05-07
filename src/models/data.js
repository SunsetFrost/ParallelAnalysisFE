import { queryData, queryNotebook } from '../services/api';

export default {
  namespace: 'data',

  state: {
    list: [],
  },

  effects: {
    *fetchData(_, { call, put }) {
      const response = yield call(queryData);
      yield put({
        type: 'getData',
        payload: response,
      });
    },
  },

  reducers: {
    getData(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};
