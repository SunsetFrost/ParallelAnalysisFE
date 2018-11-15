import request from '@/utils/request';
import setting from '@/defaultSettings';
import { stringify } from 'qs';

export async function queryLog() {
    const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/log`;
    return request(url, {
        method: 'GET',
    });
}