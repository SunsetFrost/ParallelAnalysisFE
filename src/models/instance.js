import { queryInstance, createInstance } from '../services/instance';

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
    *add({ payload }, { call, put }) {
      const response = yield call(createInstance, payload);
      yield put({
        type: '',
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
    addOneInstance(state, { payload }) {
      return {
        ...state,
        _id: payload,
      };
    },
  },
};
