import { queryLog } from '@/services/log';

export default {
    namespace: 'log',

    state: {
        list: [],
    },

    effects: {
        *fetchLogs(_, {  call, put }) {
            const response = yield call(queryLog);
            const data = response.data;
            yield put({
                type: 'getLogs',
                payload: data,
            });
        },
    },

    reducers: {
        getLogs(state, { payload }) {
            return {
                ...state,
                list: payload,
            }
        },
    },
}