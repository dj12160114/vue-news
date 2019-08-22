<template>
    <div class="goods-list">
        <!-- <router-link :to="'/home/goodsinfo/' + item.id" tag="div" 
          class="goods-item" v-for="item in goodslist" :key="item.id">
            <img :src="item.img_url" >
            <h1 class="goods-title">{{ item.title }}</h1>
            <div class="goods-info">
                <p class="goods-price">
                    <span class="goods-price-now">￥{{ item.sell_price }}</span>
                    <span class="goods-price-old">￥{{ item.market_price }}</span>
                </p>
                <p class="goods-sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 网页中有两种跳转方式  -->
        <!-- 1. 标签法：a标签 -->
        <!-- 2. 编程式导航：window.location.href -->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" >
            <h1 class="goods-title">{{ item.title }}</h1>
            <div class="goods-info">
                <p class="goods-price">
                    <span class="goods-price-now">￥{{ item.sell_price }}</span>
                    <span class="goods-price-old">￥{{ item.market_price }}</span>
                </p>
                <p class="goods-sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>


        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        // data 是往自己组件内部挂载一些私有数据
        return {
            pageindex: 1,
            goodslist: []
        }
    },
    methods: {
        // 获取商品列表
        getGoodsList() {
            this.$http.get('api/getgoods?pageindex=' + this.pageindex)
            .then(result => {
                 if(result.body.status === 0) {
                     console.log(result.body)
                     this.goodslist = this.goodslist.concat(result.body.message)
                } else { 
                    Toast('获取商品详情失败！')
                }
            })
        },
        getMore() {
            this.pageindex++
            this.getGoodsList()
        },
        // 编程式导航 跳转
        goDetail(id) {
            // 区分 this.$route 和 this.$router
            // 其中：this.$route 是路由【参数对象】，所有路由中的参数，params,query都属于它
            // this.$router 是一个路由【导航对象】，用它可以方便的 使用 JS 代码
            // 实现路由的前进、后退、刷新到新的URL地址
            // console.log(this)
            // 1. 最简单的方式
            // this.$router.push("/home/goodsinfo/"+ id)
            // 2. 传递对象
            // this.$router.push({ path: '/home/goodsinfo/' + id })
            // 3.命名的路由
            this.$router.push({ name: 'goodsinfo', params: { id }  })
        }
    },
    created() {
        this.getGoodsList() 
    }

}
</script>

<style scoped lang="scss">
.goods-list {
    padding: 7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item { 
        width: 49%;
        min-height: 293px;
        padding: 2px;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        img {
            width: 100%;
        }
        .goods-title {
            font-size: 14px;
        }
        .goods-info {
            
            p{
                margin: 0;
                padding: 5px;
            }
            background-color: #eee;
            .goods-price {
                .goods-price-now {
                    color: red;
                    // font-weight: bold;
                    font-size: 14px;
                }
                .goods-price-old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }

            }

            .goods-sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }

    }
    
}
</style>
