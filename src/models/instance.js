import { queryInstance } from '../services/instance';
import _ from 'lodash';

export default {
  namespace: 'instance',

  state: {
    list: [],
  },

  effects: {
    *fetchInstance(_, { call, put }) {
      const response = yield call(queryInstance);
      yield put({
        type: 'getInstance',
        payload: response,
      });
    },
  },

  reducers: {
    getInstance(state, { payload }) {
      return {
        ...state,
        list: payload.data,
      };
    },
  },
};
