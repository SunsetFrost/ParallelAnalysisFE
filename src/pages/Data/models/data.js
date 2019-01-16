import { queryData, downloadData } from '@/services/data';

export default {
  namespace: 'modeldata',

  state: {
    list: [],
    detail: {},
  },

  effects: {
    *fetchData(_, { call, put }) {
      const { data } = yield call(queryData);
      yield put({
        type: 'getData',
        payload: data,
      });
    },
    *downloadDataFile({ payload }, { call, put }) {
      yield call(downloadData(payload));
    },
  },

  reducers: {
    getData(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    detail(state, { payload }) {
      return {
        ...state,
        detail: {
          id: payload,
        },
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'detail',
          payload: location.query.id,
        });
      });
    },
  },
};
