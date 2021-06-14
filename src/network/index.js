import { instance } from './request';

export function getSid(){
    let timestamp = new Date().getTime();
    instance.post('/add',{'ts':timestamp}).then(res=>{

    });
}

