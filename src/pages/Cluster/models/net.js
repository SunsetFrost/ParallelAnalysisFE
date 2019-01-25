import { queryNetByParam, queryNetById, addNet, updateNet, addPC, updatePC } from '@/services/net';
// import router from 'umi/router';
import { routerRedux } from 'dva/router';

export default {
  namespace: 'net',

  state: {
    list: [],
    detail: {},
    /*
      create: {
        type: {
          value
          ?id
        }
        value
      }
    */
    create: {},
  },

  effects: {
    *fetchByParam({ payload }, { call, put }) {
      const { data } = yield call(queryNetByParam, payload);
      yield put({
        type: 'saveList',
        payload: data,
      });
    },
    *fetchById({ payload }, { call, put }) {
      const { data } = yield call(queryNetById, payload);
      yield put({
        type: 'saveDetail',
        payload: data,
      });
    },
    *addNet({ payload }, { call, put }) {
      const { data } = yield call(addNet, payload);
      yield put({
        type: 'saveCreate',
        payload: {
          value: data,
        },
      });
      yield put(routerRedux.push('/cluster/net-create/result'));
    },
    *update({ data }, { call, put }) {
      const { isSuccess } = yield call(updateNet, payload);
      yield put(routerRedux.push('/cluster/net-create/result'));
    },
    *addPC({ payload }, { call, put }) {
      const { data } = yield call(addPC, payload);
      yield put({
        type: 'saveCreate',
        payload: {
          value: data,
        },
      });
      yield put(routerRedux.push('/cluster/net-create/result'));
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
          ...state.create,
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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/cluster/net-detail') {
          dispatch({
            type: 'saveDetailById',
            payload: location.query.id,
          });
        } else if (location.pathname === '/cluster/net-create/net-cfg' && location.query.id) {
          // dispatch({
          //   type: 'saveCreate',
          //   payload: {
          //     value: {
          //       id: location.query.id,
          //     },
          //   },
          // });
        }
      });
    },
  },
};
