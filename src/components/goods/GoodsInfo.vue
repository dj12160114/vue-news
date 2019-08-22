<template>
    <div class="goods-info">
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swipe :swipeList="swipeList" :isfull="false"></swipe>
                </div>
            </div>
		</div>
        <!-- 商品轮播图宽度100%设置不合适 -->
        <!-- 解决：使用组件的时候手动指定是否100%显示-->


        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;
                        销售价：<span class="now_price">￥{{ goodsinfo.sell_price}}</span>
                    </p>
                    <P>购买数量：<infonum></infonum></P>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
	    </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{ goodsinfo.goods_no }}</p>
                    <p>库存情况：{{ goodsinfo.stock_quantity }}</p>
                    <p>上架时间：{{ goodsinfo.add_time | dateFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDescribe(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain  @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Swipe from '../subcomponents/Swipe.vue'
import InfoNum from '../subcomponents/InfoNum.vue'


export default {
    data() {
        return {
            id: this.$route.params.id,
            swipeList: [],
            goodsinfo: {}
        }
    },
    methods: {
        getSwipe() {
            this.$http.get('api/getthumimages/' + this.id)
            .then(result => {
                if(result.body.status === 0) {
                    result.body.message.forEach(element => {
                        element.img = element.src                      
                    });
                    this.swipeList = result.body.message
                } else {
                    Toast('轮播图获取失败！')
                }
            })
        },
        getGoodsInfo() {
            
            this.$http.get('api/goods/getinfo/' + this.id)
            .then(result => {
                if(result.body.status === 0) {
                    this.goodsinfo = result.body.message[0]
                    console.log(result.body)
                } else {
                    // console.log(result.body)
                    Toast('商品详情获取失败！')
                }
            })
        },
        // 编程式导航 跳转到图文介绍页面
        goDescribe(id) {
            this.$router.push({ name:'godescribe', params: { id }})
        },
        // 点击跳转到评论页面
        goComment(id) {
            this.$router.push({ name:'gocomment', params: { id }})
        }
    },
    created() {
        this.getSwipe(),
        this.getGoodsInfo()
    },
    components: {
        'swipe': Swipe,
        'infonum': InfoNum
    }

}
</script>

<style scoped lang="scss">
.goods-info {
    background-color: #eee;
    overflow: hidden;

    .now_price {
        color: red;
        font-size: 16px;
        
    }

    .mui-card-footer {
        display: block;

        button {
            margin: 15px 0;
        }
    }
    
}
</style>
