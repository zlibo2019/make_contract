const Common ={
    state:{
        // defaultErrImg: require('../assets/images/errorImg.jpg'),//图片onerror时展示的错误图片
        // defaultLineArrow: require('../assets/images/arrow_line.png'),//导航之间的图标
        roleActions: [],// 权限id数组
    },
    mutations: {
        SET_ROLEACTION_LIST(state, payload) {
            // console.log("mutations:",state, payload)
            state.roleActions = payload.roleActions
        }
      }
}
export default Common