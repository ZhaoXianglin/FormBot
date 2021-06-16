import axios from 'axios'

export const instance = axios.create({
        baseURL: "http://47.242.140.70:8080",
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
