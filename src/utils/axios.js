import axios from 'axios';
import  router  from '../router/index';
import { Message } from 'element-ui'


const msgDuration = '2000';//Message 提示时间

// 超时设定
// axios.defaults.timeout = 15000;

// 请求拦截器
axios.interceptors.request.use(config => {
    return config;
}, err => {
    Message({
        message: '请求超时',
        duration: msgDuration,
        type:'error'
    });
    return Promise.reject(err);
});

// http response 拦截器
axios.interceptors.response.use(res => {
    if (res.status === 200) {            
        return Promise.resolve(res);        
    } else {            
        return Promise.reject(res);        
    }
}, (err) => {
    // 返回状态码不为200时候的错误处理
    // console.log(err.response.data.message)
    if(err.response){
        switch (err.response.status) {
            case 401:
                // 未登录 清除已登录状态
                // router.push('/');
                break;
            case 403:
                // 没有权限
                Message({
                    message: "无权限查看",  
                    duration: msgDuration,
                    type:'error'      
                });
                break;
            case 500:
                // 服务器内部错误
                Message({
                    message: "系统异常，请稍后重试",  
                    duration: msgDuration,
                    type:'error'      
                });
                break;
            case 502:
                // 网关错误
                Message({
                    message: "系统异常，请稍后重试",  
                    duration: msgDuration,
                    type:'error'      
                });
                break;
            case 504:
                // 服务器异常
                Message({
                    message: "系统异常，请稍后重试",  
                    duration: msgDuration,
                    type:'error'      
                });
                break;
            default:
                if (err.response.data.message !== null) {
                    Message({
                        message: err.response.data.message,  
                        duration: msgDuration,
                        type:'error'      
                    });
                } else {
                    Message({
                        message: "系统异常，请稍后重试",  
                        duration: msgDuration,
                        type:'error'      
                    });
                }
        }
    }
    return Promise.reject(err);
});


//通用axios
export const commonAxios = (type, url, params) =>{
    if(type.toUpperCase() == 'GET' || type.toUpperCase() == 'DELETE'){
        if(process.env.NODE_ENV == 'mock'){
            return axios({
                method: type,
                url: `${url}`,
                data: params,
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
        }else{
            return axios({
                method: type,
                url: `${url}`,
                params: params,
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`
                }
            })
        }
         
    }else{
        return axios({
            method: type,
            url: `${url}`,
            data: params,
            headers: {
                'Authorization': `Token ${localStorage.getItem('token')}`
            }
        })  
    } 
}
//以get参数的形式走post请求
export const geturlPost = (url, params) =>{
    return axios({
        method: "post",
        url: `${url}`,
        params: params,
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }) 
}

//以post形式走put请求
export const putAxios = (url, params) =>{
  return axios({
      method: "put",
      url: `${url}`,
      data: params,
      headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
      }
  }) 
}

//以post形式走delete请求
export const deleteAxios = (url, params) =>{
    return axios({
        method: "delete",
        url: `${url}`,
        data: params,
        headers: {
            'Authorization': `Token ${localStorage.getItem('token')}`
        }
    }) 
}

