<template>
<div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(item, index) in swipeList" :key="index">
           <img :src="item.img" alt="新闻">
        </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格布局 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/newslist">
                <img src="../../images/menu/menu1.png" alt="news">
                <div class="mui-media-body">新闻资讯</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/photolist">
                <img src="../../images/menu/menu2.png" router-linklt="images">
                <div class="mui-media-body">图片分享</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="/home/goodsbuy">
                <img src="../../images/menu/menu3.png" alt="goods">
                <div class="mui-media-body">商品购买</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="#">
                <img src="../../images/menu/menu4.png" alt="words">
                <div class="mui-media-body">留言反馈</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="#">
                <img src="../../images/menu/menu5.png" alt="videos">
                <div class="mui-media-body">视频专区</div>
            </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
            <router-link to="#">
                <img src="../../images/menu/menu6.png" alt="contacts">
                <div class="mui-media-body">联系我们</div>
            </router-link>
        </li>
    </ul> 
</div> 
</template>

<script>
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            // 保存轮播图的数组
            swipeList: []
        }
    },
    created() {
        this.getSwipe()
    },
    methods: {
        getSwipe() {
            this.$http.get("api/getlunbo")
            .then(result => {
                if(result.body.status == 0) {
                    this.swipeList = result.body.message;
                } else {
                    Toast('加载轮播图失败');
                }
            });
        }
    }
}
</script>

<style scoped lang="scss">
.mint-swipe {
    height: 160px;

    .mint-swipe-item {
        &:nth-child(1) {
            background-color: #ccc;
        }
        &:nth-child(2) {
            background-color: #666;
        }
        &:nth-child(3) {
            background-color: #aaa;
        }

        img {
            width: 100%;
            height: 100%;
        }
        
    }
}

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;

    .mui-table-view-cell {
        border: 0; 
    
        .mui-media-body {
            font-size: 12px;
        }

    }

    img {
        width: 60px;
        height: 60px;
    }

    
}

</style>