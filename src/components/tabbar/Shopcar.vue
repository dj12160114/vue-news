<template>
    <div class="shopcar-container">
        <!-- 商品区域 -->
        <div class="cargoods-list">
            <div class="mui-card" v-for="(item, index) in shopcarlist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch></mt-switch>
                        <img :src="item.thumb_path">
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <shopcarnum :buycount="$store.getters.getShopCarGoodsCount[item.id]"
                                            :goodsid="item.id">
                                </shopcarnum>
                                <!-- 如何从购物车商品数据中拿到商品数量 -->
                                <!-- 1. 创建一个空对象，循环商品数据，把商品的 id 作为 对象属性名
                                 count 值作为 对象属性值 -->
                                <a href="#" @click.prevent="remove(item.id, index)">删除</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 结算区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    这是一个最简单的卡片视图控件；卡片视图常用来显示完整独立的一段信息，比如一篇文章的预览图、作者信息、点赞数量等
                </div>
            </div>
        </div>
       
    </div>
</template>

<script>
import ShopCarNum from '../subcomponents/ShopCarNum.vue'
import { Toast } from 'mint-ui'
export default {    
    data() {
        return {
            shopcarlist: []
        }
    },
    methods: {
        getShopCarList() {
            // 1. 获取到 store 中所有商品的 id，拼接出一个 用逗号分隔的字符串
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id));
            // 如果 购物车为空，则直接返回，不需要请求数据接口，否则会报错
            if(idArr.length <= 0) {
                return;
            }
            this.$http.get('api/goods/getshopcarlist/' + idArr.join(','))
            .then(result => {
                if(result.body.status === 0) {
                    this.shopcarlist = result.body.message
                    console.log(result.body.message)
                } else {
                    Toast('获取购物车数据出错！')
                }
            })
        },
        // 点击删除，把商品从 store 中根据传递的 id删除，同时，把当前组件中的
        // shopcarlist中，对应要删除的那个商品，使用商品索引值 index 删除
        remove(id, index) {
            this.shopcarlist.splice(index, 1);
            this.$store.commit('removeFromCar', id)
        }
    },
    created() {
        this.getShopCarList()
    },
    components: {
        'shopcarnum': ShopCarNum
    },

}
</script>

<style scoped lang="scss">
.shopcar-container{
    background-color: #eee;
    overflow: hidden;
    .cargoods-list {
        .mui-card-content-inner{
            display: flex;
            align-items: center;
            padding: 10px;

             img{
                width: 60px;
                height: 60px;
            }

            h1{
                 font-size: 14px;
             }
            .info{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin: 0 6px;
                .price{
                    color: red;
                }
                
            }
            .mint-switch {
                margin-right: 5px;
            }
        
        }
       
        
    }
}

</style>
