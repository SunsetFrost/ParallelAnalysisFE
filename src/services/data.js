import request from '@/utils/request';
import setting from '@/defaultSettings';

export async function queryData() {
    const url = `http://${setting.backEndDB.ip}:${setting.backEndDB.port}/data`;
    return request(url, {
        method: 'GET',
    });
}