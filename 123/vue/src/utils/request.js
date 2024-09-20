import axios from 'axios'
import router from "../router";

const request = axios.create({
    baseURL: 'http://localhost:9090/api',
    timeout: 5000
})

// request 拦截器
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';

    // 用户的token
    let userToken = sessionStorage.getItem('token');
    if (userToken) {
        config.headers['Authorization'] = `${userToken}`;
    }else {
        // router.push("/login");
    }

    return config;
}, error => {
    return Promise.reject(error);
});


// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)


export default request

