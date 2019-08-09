import { commonAxios } from '../utils/axios';
import Base from './base';
// 登陆
const Login = {
    //  登录接口
    login(params) {
        return commonAxios("post",`${Base.oldUrl}account/loginCheck`, params);
    },
    //  获取字典信息
    getDictionary(params) {
        return commonAxios("get",`${Base.oldUrl}code/get_all_dic`, params)
    },
}
export default Login