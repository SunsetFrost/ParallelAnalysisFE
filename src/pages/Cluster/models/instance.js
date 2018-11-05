import { queryInstance, createInstance } from '@/services/instance';
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
            yield put({
                type: 'changeInstanceOrder',
                payload: 'createTime', 
            });
        },
        *add({ payload }, { call, put }) {
            const { data } = yield call(createInstance, payload);
            yield put({
                type:  'addInstance',
                payload: data,
            });
        },
    },

    reducers: {
        getInstance(state, { payload }) {
            console.log(payload);
            return {
                ...state,
                list: payload,
            };
        },
        addInstance(state, { payload }) {
            return {
                ...state,
                detail: {
                    _id: payload
                }
            };
        },
        changeInstanceOrder(state, { payload }) {
            if(payload == 'createTime') {
                return {
                    ...state,
                    list: state.list.sort((a, b) => {
                        return moment(a.time.start).isBefore(b.time.start)? 1 : -1;
                        
                    })
                };
            }
        },
    },
};
