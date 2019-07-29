# 协同云教育平台-WEB端
  
### 前言
本项目是协同云教育平台web端管理系统，主要技术栈采用vue、element、webpack。

 # 项目目录介绍 
 
 ```
├── src
│   ├── api
│       │   └── index.js 数据接口
│   ├── assets 静态资源
│       │   └── images  图片
│       │   └── js  方法
│   ├── components  公共组件
│   ├── plugins  插件
│   ├── router
│       │   └── index.js 路由
│   ├── store
│       │   └── index.js 状态管理
│   ├── utils
│       │   └── index.js 常用方法
│       │   └── axios.js 封装axios
│   ├── views
│       │   └── BasicInfo  基础信息
│       │   └── common  公共组件
│       │   └── DataCount  数据统计
│       │   └── DeviceControl 设备监控
│       │   └── Header 头部
│       │   └── Login  登录
│       │   └── RecordLog 操作日志
│       │   └── RoleAuthority 角色授权
│       │   └── Rules 应用规则
│   ├── App.vue 
│   ├── main.js  
```

# 线上地址
前端地址:https://apigateway.weds.com.cn

# 运行步骤
- git clone git@10.0.0.82:k12soft/webProject.git
- cd webProject
- npm install/yarn install
- npm run dev/npm run build
- 浏览器访问http://localhost:8080

# 发布步骤
前后端分离，前端单独部署在tengine下，Tengine是由淘宝网发起的Web服务器项目。它在Nginx的基础上，针对大访问量网站的需求，添加了很多高级功能和特性，更多tengine的学习资料请自行查阅；

- 上传文件到服务器 
 ```
 $ scp dist.zip root@39.104.167.184:/usr/local/tengine/html/
 $ unzip dist.zip
 $ nginx -s reload
 ```