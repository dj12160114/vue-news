// 入口文件
import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)
// 1.3 导入 自己的路由模块
import router from './router.js'

import Vuex from 'vuex'
Vue.use(Vuex)
// 每次刚进入网站，调用 main.js，在刚调用的时候先从本地存储中 把购物车的数据都出来，
// 放到 store 中
var car = JSON.parse(localStorage.getItem('car')) || '[]'
var store = new Vuex.Store({
    state: {
        // 将购物车中商品数据用数组存储，在数组中存储一些商品对象:
        // { id： 商品的 id, count: 要购买的数量, price: 商品单价, slected: false }
        car
    },
    mutations: {
        addToCar(state, shopCarList) {
            // 点击加入购物车，把商品信息保存到 store 的car上
            // 分析：如果购物车之前就有这个商品，那么只需要更新数据
            // 如果没有，则直接吧商品数据 push 到 car中

            // 假设 在购物车中没有 找到对应的商品
            var flag = false
            state.car.some(item => {
                if(item.id == shopCarList.id) {
                    item.count += parseInt(shopCarList.count)
                    flag = true
                    return true                   
                } 
            })
            if(!flag) {
                state.car.push(shopCarList)
            }

            // 当更新 car 之后，把car数组存储到本地的 localStorage之中
            localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateCarCount(state, shopCarList) {
            // 修改购物车商品数量值
            state.car.some(item => {
                if(item.id == shopCarList.id) {
                    item.count = parseInt(shopCarList.count);
                    return true;
                }
            })
            // 修改完商品数量，就把最新的购物车数据 保存到本地存储中
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        removeFromCar(state, id) {
            // 根据id，从 store中的购物车中删除对应商品数据
            state.car.some( (item, index)=>{
                if(item.id == id) {
                    state.car.splice(index, 1);
                    return true;
                }
            })
            // 将删除完成的，最新的购物车数据保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car));
        }
    },
    getters: {
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },
        getShopCarGoodsCount(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.count;
            })
            return o;
        }
    }
})

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

// import { Header, Swipe, SwipeItem, Button, Lazyload  } from 'mint-ui'

// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.component(Header.name, Header)
// Vue.component(Button.name, Button)
// Vue.use(Lazyload); 懒加载按需导入不能正常实现效果

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

import app from './App.vue'

var vm = new Vue({
    el: '#app',
    data() {
        return {

        }
    },
    render: c => c(app),
    router, // 挂载路由对象
    store
})