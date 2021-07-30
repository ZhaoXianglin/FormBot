import axios from 'axios'

export const instance = axios.create({
        //baseURL: "http://773f3cbcbd55.ngrok.io",
        //baseURL: "http://localhost:5000",
        baseURL: "https://bot.comp.hkbu.edu.hk",
        timeout: 20000,
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
