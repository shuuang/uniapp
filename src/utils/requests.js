import axios from "@/js_sdk/gangdiedao-uni-axios";
// import axios from "axios";
import store from "@/store";
// import {getToken} from "@/utils/auth";

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

//请求拦截
api.interceptors.request.use(
    config => {
        try{
            config.headers['x-Token']=uni.getStorageSync("token")
        }catch (e) {
            console.log("token err",e)
        }
        // uni.getStorage({
        //     key: 'token',
        //     success: result => {
        //         console.log(result)
        //         if (result.data){
        //             config.headers['x-Token'] = result.data
        //         }
        //     }
        // })
        // if (store.getters.token) {
        //     // config.headers['X-Token'] = getToken()
        //     config.headers['X-Token'] = store.getters.token
        // }
        return config
    },
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
//响应拦截
api.interceptors.response.use(response => {
        // console.log(response)
    const res = response.data
        // console.log(res)
    if (res.code !== 20000){
        // console.log("response !== 20000")
        if (res.code === 50008 || res.code === 50012 || res.code ===50014){
            // console.log("res.code不对")
            return Promise.reject(new Error(res.msg || "error"))
        }
        return res
    }else {
        return res
    }
},
    error => {
        console.log('err' + error) // for debug
        return Promise.reject(error)
    }
)
export default api