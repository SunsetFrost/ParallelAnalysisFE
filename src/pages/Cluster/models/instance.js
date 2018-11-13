import { queryInstance, createInstance, startInstance } from '@/services/instance';
import moment from 'moment';

export default {
  namespace: 'instance',

  state: {
    list: [],
    detail: {},
  },

  effects: {
    *fetchInstance(_, { call, put }) {
      const { data } = yield call(queryInstance);

      yield put({
        type: 'getInstance',
        payload: data,
      });
      // yield put({
      //     type: 'changeInstanceOrder',
      //     payload: 'createTime',
      // });
    },
    *fetchInstanceById({ payload }, { call, put }) {

    },
    *add({ payload }, { call, put }) {
      const { data } = yield call(createInstance, payload);
      yield put({
        type: 'addInstance',
        payload: data,
      });
    },
    *start({ payload }, { call }) {
      yield call(startInstance, payload.id);
    },
  },

  reducers: {
    getInstance(state, { payload }) {
      return {
        ...state,
        list: payload.sort((a, b) => {
          return moment(a.time.start).isBefore(b.time.start) ? 1 : -1;
        }),
      };
    },
    addInstance(state, { payload }) {
      return {
        ...state,
        detail: {
          _id: payload,
        },
      };
    },
    changeInstanceOrder(state, { payload }) {
      if (payload == 'createTime') {
        return {
          ...state,
          list: state.list.sort((a, b) => {
            return moment(a.time.start).isBefore(b.time.start) ? 1 : -1;
          }),
        };
      }
    },
    detail(state, { payload }) {
        return {
            ...state,
            detail: {
                id: payload,
            }
        }
    }
  },

  subscriptions: {      
      setup({ dispatch, history }) {          
          history.listen((location) => {
              if(location.pathname === '/cluster/instance-detail') {
                console.log('history trigger!~!!!!');
                  dispatch({
                      type: 'detail',
                      payload: location.query.id,
                  })
              }
          })
      }
  }
};
