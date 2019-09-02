import { commonAxios } from '../utils/axios';
import Base from './base';
// 登陆
const Login = {
    //  登录接口
    login(params) {
        return commonAxios("post",`${Base.server}/account/loginCheck`, params);
    },
}
export default Login;