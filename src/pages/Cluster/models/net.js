import { queryNet, addNet } from '@/services/net';
import router from 'umi/router';

export default {
  namespace: 'net',

  state: {
    list: [],
    detail: {},
  },

  effects: {
    *fetch(_, { call, put }) {
      const { data } = yield call(queryNet);
      yield put({
        type: 'saveList',
        payload: data,
      });
    },
    *add({ payload }, { call, put }) {
      const { data } = yield call(addNet, payload);
      yield put({
        type: 'saveCreate',
        payload: {
          form: data,
        },
      });
      yield put(router.push('/cluster/net-create/result'));
    },
  },

  reducers: {
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload,
      };
    },
    saveDetail(state, { payload }) {
      return {
        ...state,
        detail: payload,
      };
    },
    saveDetailById(state, { payload }) {
      const [detail] = state.list.filter(item => {
        let isNet = false;
        if (item._id === payload) {
          isNet = true;
        }
        return isNet;
      });

      return {
        ...state,
        detail,
      };
    },
    clearDetail(state) {
      return {
        ...state,
        detail: {},
      };
    },
    saveCreate(state, { payload }) {
      return {
        ...state,
        create: {
          ...payload,
        },
      };
    },
    clearCreate(state) {
      return {
        ...state,
        create: {},
      };
    },
    saveFormType(state, { payload }) {
      return {
        ...state,
        form_type: payload,
      };
    },
    saveDetailOfForm(state, { payload }) {
      if (payload.form_type === 'net-config') {
        return {
          ...state,
          detail: payload.form,
        };
      }
      return {
        ...state,
      };
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cluster/net-detail') {
          dispatch({
            type: 'saveDetailById',
            payload: location.query.id,
          });
        }
      });
    },
  },
};
