import { queryData } from '@/services/data';

export default {
    namespace: 'data',

    state: {
        list: [],
    },

    effects: {
        *fetchData(_, { call, put }) {
            const { data } = yield call(queryData);
            yield put({
                type: 'getData',
                payload: data,
            });
        },
    },

    reducers: {
        getData(state, { payload }) {
            return {
                ...state,
                list: payload,
            };
        },
    },
};