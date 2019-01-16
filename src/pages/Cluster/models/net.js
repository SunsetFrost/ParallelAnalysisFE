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
    updateDetail(state, { payload }) {
      const [detail] = state.list.filter(item => {
        let isNet = false;
        if(item._id === payload) {
          isNet = true;
        } 
        return isNet;
      })

      return {
        ...state,
        detail
      }
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if(location.pathname === '/cluster/net-detail') {
          dispatch({
            type: 'updateDetail',
            payload: location.query.id,
          })
        }
      })
    }
  }
};
