import { queryNotebook } from '../services/api';

export default {
  namespace: 'notebook',

  state: {
    list: [],
  },

  effects: {
    *fetchNotebook(_, { call, put }) {
      const response = yield call(queryNotebook);
      yield put({
        type: 'getNotebook',
        payload: response,
      });
    },
  },

  reducers: {
    getNotebook(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
  },
};
