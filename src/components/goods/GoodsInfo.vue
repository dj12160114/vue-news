<template>
    <div class="goods-info">
        <transition @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
            <span class="ball" v-show="ballFlag" ref="ball"></span>
        </transition>
       
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
                    <p class="buy-num">购买数量：
                        <infonum @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></infonum>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
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
            goodsinfo: {},
            ballFlag: false,
            selectedCount: 1, // 保存选中的商品数量
            
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
        },
        addToShopCar() {
            this.ballFlag = !this.ballFlag;
            // 保存到 car 数组中的商品对象
            var shopCarList = { 
                id: this.id, 
                count: this.selectedCount, 
                price: this.goodsinfo.sell_price, 
                selected: true
            };

            this.$store.commit('addToCar', shopCarList);
        },
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)"
        },
        enter(el, done) {
            el.offsetWidth;
            // 获取小球在页面的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            // 获取购物车数量在页面的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();

            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;
            // ES6模板字符串
            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
            // cubic-bezier(.4,-0.3,1,.68)
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count) {
            // 子组件把选中的数量传递给父组件的时候，把 选中的值 保存到data中
           this.selectedCount = count;
           console.log(this.selectedCount)
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
    .ball{
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: red;
        position: absolute;
        z-index: 99;
        left: 150px;
        top: 370px;

    }
   
}
</style>
