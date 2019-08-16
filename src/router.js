
import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Shopcar from './components/tabbar/Shopcar.vue'
import Search from './components/tabbar/Search.vue'


var router = new VueRouter({
    routes: [
       { path: '/', redirect: '/home' },
       { path: '/home', component: Home },
       { path: '/member', component: Member },
       { path: '/shopcar', component: Shopcar },
       { path: '/search', component: Search }
       
    ],
    // 覆盖默认的路由高亮类，默认的类叫 router-link-active
    linkActiveClass: 'mui-active'
})

export default router
