// 入口文件
import Vue from 'vue'

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'

// 按需导入 Mint-UI的组件
import { Header } from 'mint-ui'
Vue.component(Header.name, Header)

import app from './App.vue'

var vm = new Vue({
    el: '#app',
    data() {
        return {

        }
    },
    render: c => c(app)
})