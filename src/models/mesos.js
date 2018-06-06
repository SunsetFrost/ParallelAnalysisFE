import { queryMaster, queryAgents, queryFrameworks, queryInstances } from '../services/mesos';
import _ from 'lodash';

export default {
  namespace: 'mesos',

  state: {
    master: [],
    agents: [],
    frameworks: {
      list: [],
      pagination: {},
    },
    instances: [],
  },

  effects: {
    *fetchMaster(_, { call, put }) {
      const response = yield call(queryMaster);
      yield put({
        type: 'getMaster',
        payload: response,
      });
    },
    *fetchAgents(_, { call, put }) {
      const response = yield call(queryAgents);
      yield put({
        type: 'getAgents',
        payload: response,
      });
    },
    *fetchFrameworks(_, { call, put }) {
      const response = yield call(queryFrameworks);
      yield put({
        type: 'getFrameworks',
        payload: response,
      });
    },
    *fetchFrameworksByPage({ payload }, { call, put }) {
      const response = yield call(queryFrameworks);
      yield put({
        type: 'getFrameworksByPage',
        payload: {
          ...payload,
          response,
        },
      });
    },
    *fetchInstances({ payload }, { call, put }) {
      const response = yield call(queryInstances);
      yield put({
        type: '',
        payload: response,
      });
    },
  },

  reducers: {
    getMaster(state, { payload }) {
      return {
        ...state,
        master: payload,
      };
    },
    getAgents(state, { payload }) {
      return {
        ...state,
        agents: payload,
      };
    },
    getFrameworks(state, { payload }) {
      //transfrom the framework structure
      const newPayload = [];
      if (payload.frameworks.length !== 0) {
        newPayload.push(
          ...payload.frameworks.map(item => {
            return Object.assign(item, {
              type: 'running',
            });
          })
        );
      }
      if (payload.completed_frameworks.length !== 0) {
        newPayload.push(
          ...payload.completed_frameworks.map(item => {
            return Object.assign(item, {
              type: 'finished',
            });
          })
        );
      }
      newPayload.reverse(); //order by newest time

      return {
        ...state,
        frameworks: newPayload,
      };
    },
    getFrameworksByPage(state, { payload }) {
      //transfrom the framework structure
      const newPayload = [];
      if (payload.response.frameworks.length !== 0) {
        newPayload.push(
          ...payload.response.frameworks.map(item => {
            return Object.assign(item, {
              type: 'running',
            });
          })
        );
      }
      if (payload.response.completed_frameworks.length !== 0) {
        newPayload.push(
          ...payload.response.completed_frameworks.map(item => {
            return Object.assign(item, {
              type: 'finished',
            });
          })
        );
      }
      newPayload.reverse(); //order by newest time
      const pagePayload = newPayload.slice(
        (payload.currentPage - 1) * payload.pageSize,
        payload.currentPage * payload.pageSize
      );
      return {
        ...state,
        frameworks: {
          list: pagePayload,
          pagination: {
            total: newPayload.length,
          },
        },
      };
    },
    getInstance(state, { payload }) {
      return({
        ...state,
        instances: payload,
      });
    }
  },
};
