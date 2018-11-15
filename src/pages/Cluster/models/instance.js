import { queryInstance, createInstance, startInstance } from '@/services/instance';
import moment from 'moment';

export default {
  namespace: 'instance',

  state: {
    list: [],
    detail: {
      id: '',
    },
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
    setDetailId(state, { payload }) {
        return {
            ...state,
            detail: {
                _id: payload,
            }
        }
    },
    setDetail(state) {
      let newDetail = state.detail;
      if(newDetail.id != '') {
        newDetail = state.list.filter(item => {
          if(item._id === newDetail._id) {
              return true;
          } else {
              return false;
          }
        })[0]
      }

      return {
        ...state,
        detail: {
          ...newDetail,
        },
      }
    }
  },

  subscriptions: {      
      setup({ dispatch, history }) {          
          history.listen((location) => {
              if(location.pathname === '/cluster/instance-detail') {
                console.log('history trigger!~!!!!');
                  dispatch({
                    type: 'setDetailId',
                    payload: location.query.id,
                  });
                  dispatch({
                    type: 'setDetail',
                  })
              }
          })
      }
  }
};
