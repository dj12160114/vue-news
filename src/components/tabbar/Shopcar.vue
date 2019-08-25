<template>
    <div class="shopcar-container">
        <!-- 商品区域 -->
        <div class="cargoods-list">
            <div class="mui-card" v-for="(item, index) in shopcarlist" :key="item.id">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
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
                <div class="mui-card-content-inner pay">
                   <div class="left">
                       <p>总计(不含运费)</p>
                       <p>已勾选商品 <span class="num">{{ $store.getters.getGoodsCountAndTotal.count }}</span> 件，
                       总件 <span class="num">￥{{ $store.getters.getGoodsCountAndTotal.total }}</span></p>
                   </div>
                   <mt-button type="danger">去结算</mt-button>
                </div>
                
            </div>
        </div>
       <!-- <p>{{ $store.getters.getGoodsSelected }}</p> -->
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
        },
        selectedChanged(id, val) {
            // 每当点击开关，把最新的开关状态同步到 store 中
            console.log(id + '-----' + val);
            this.$store.commit('updateSelected',{
                id,
                selected: val
            })
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
    .pay{
        display: flex;
        justify-content: space-between;
        align-items: center;
        .num {
            color: red;
        }
    }
}

</style>
