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
// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI的组件
import { Header, Swipe, SwipeItem  } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Header.name, Header)


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