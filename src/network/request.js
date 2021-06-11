import axios from 'axios'

export function request(config) {
    return new Promise((resolve, reject) => {
        const instance = axios.create({
            baseURL: "http://123.207.32.32:8000",
            timeout: 5000,
        })
        instance(config)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                console.log(err);
                reject(err)
            })
    })
}

// 使用方法
//
// request({
//     url: '/home/multidata',
// }).then(res => {
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })
