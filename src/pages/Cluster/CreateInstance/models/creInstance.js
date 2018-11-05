import { routerRedux } from 'dva/router';
import { message } from 'antd';
import moment from 'moment';
import { createInstance } from '@/services/instance';

export default {
    namespace: 'creInstance',

    state: {
        name: 'instance',
        model: 'ibis',
        time: ['2015/01/01', '2018/05/01'],
        siteStart: '1',
        siteEnd: '50',
        dataset: '',
        paramsset: '',
        mode: 'single',
        cpu: '1',
        mem: '1',
        createTime: -1,
        user: '',
    },

    effects: {
        *submitInstance({ payload }, { call, put }) {
            yield call(createInstance, payload);
            yield put({
                type: 'saveInstance',
                payload,
            });
            yield put(routerRedux.push('/cluster/create/result'));
        },
    },

    reducers: {
        saveInstance(state, { payload }) {
            // const name = payload.name;
            // const modelCfg = {
            //     models: [payload.model],
            //     time: {
            //         start: moment(payload.time[0], 'YYYY/MM/DD'),
            //         end: moment(payload.time[1], 'YYYY/MM/DD'),
            //     },
            //     site: {
            //         start: payload.siteStart,
            //         end: payload.siteEnd,
            //     },
            // }

            return {
                ...state,
                ...payload,
            };
        },
        clearInstance(state) {
            return {
                name: 'instance',
                model: 'ibis',
                time: ['2015/01/01', '2018/05/01'],
                siteStart: '1',
                siteEnd: '50',
                dataset: '',
                paramsset: '',
                mode: 'single',
                cpu: '1',
                mem: '1',
                createTime: '',
                user: '',
            }
        }
    },
};