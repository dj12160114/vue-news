// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)
// 1.3 导入 自己的路由模块
import router from './router.js'

import VueResource from 'vue-resource'
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005'
Vue.http.options.emulateJSON = true

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI的组件

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局过滤器

Vue.filter('dateFormat', function(dateStr, pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dateStr).format(pattern)
})

import { Header, Swipe, SwipeItem, Button, Lazyload  } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.use(Lazyload);

import app from './App.vue'

var vm = new Vue({
    el: '#app',
    data() {
        return {

        }
    },
    render: c => c(app),
    router // 挂载路由对象
})