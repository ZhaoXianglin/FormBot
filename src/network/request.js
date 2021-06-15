import axios from 'axios'

export const instance = axios.create({
        baseURL: "https://formbotserver.herokuapp.com/",
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
