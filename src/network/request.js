import axios from 'axios'

export const instance = axios.create({
        baseURL: "http://127.0.0.1:5000",
        timeout: 5000,
    })

// 使用方法
//
// request({
//     url: '/home/multidata',
// }).then(res => {
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })
