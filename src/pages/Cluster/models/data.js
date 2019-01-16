import { queryData } from '@/services/data';

export default {
  namespace: 'data',

  state: {
    list: [],
  },

  effects: {
    *fetchDatas(_, { call, put }) {
      const { data } = yield call(queryData);
      yield put({
        type: 'getDatas',
        payload: data,
      });
    },
  },

  reducers: {
    getDatas(states, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    updateDetail(state, { payload }) {
      const [detail] = state.list.filter(item => {
        let isData = false;
        if (item._id === payload) {
          isData = true;
        }
        return isData;
      });

      return {
        ...state,
        detail,
      };
    },
  },

  subsriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cluster/data-detail') {
          dispatch({
            type: 'updateDetail',
            payload: location.query.id,
          });
        }
      });
    },
  },
};
