import { queryCalc, addCalc } from '@/services/calc';

export default {
  namespace: 'calc',

  state: {
    list: [],
  },

  effects: {
    *fetchCalc(_, { call, put }) {
      const { data } = yield call(queryCalc);
      yield put({
        type: 'getCalcs',
        payload: calc,
      });
    },
  },

  reducers: {
    getCalcs(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    updateDetail(state, { payload }) {
      const [detail] = state.list.filter(item => {
        let isCalc = false;
        if (item._id === payload) {
          isCalc = true;
        }
        return isCalc;
      });

      return {
        ...state,
        detail,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cluster/calc-detail') {
          dispatch({
            type: 'updateDetail',
            payload: location.query.id,
          });
        }
      });
    },
  },
};
