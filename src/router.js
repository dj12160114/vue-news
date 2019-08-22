
import VueRouter from 'vue-router'

import Home from './components/tabbar/Home.vue'
import Member from './components/tabbar/Member.vue'
import Shopcar from './components/tabbar/Shopcar.vue'
import Search from './components/tabbar/Search.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsBuy from './components/goods/GoodsBuy.vue'

var router = new VueRouter({
    routes: [
       { path: '/', redirect: '/home' },
       { path: '/home', component: Home },
       { path: '/member', component: Member },
       { path: '/shopcar', component: Shopcar },
       { path: '/search', component: Search },
       { path: '/home/newslist', component: NewsList },
       { path: '/home/newsinfo/:id', component: NewsInfo },
       { path: '/home/photolist', component: PhotoList },
       { path: '/home/photoinfo/:id', component: PhotoInfo },
       { path: '/home/goodsbuy', component: GoodsBuy }
    ],
    // 覆盖默认的路由高亮类，默认的类叫 router-link-active
    linkActiveClass: 'mui-active'
})

export default router
