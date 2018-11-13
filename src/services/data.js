import request from '@/utils/request';
import setting from '@/defaultSettings';
import { stringify } from 'qs';

export async function queryData() {
    const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/data`;
    return request(url, {
        method: 'GET',
    });
}

export async function downloadData(params) {
    const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/data/download${stringify(params)}`;
    return request(url, {
        method: 'GET',
    });
}