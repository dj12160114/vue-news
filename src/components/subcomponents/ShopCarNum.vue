<template>
    <div class="mui-numbox" data-numbox-min='1' style="height: 25px;">
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" 
               type="number" :value="buycount" @change="countChanged"
               ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {
        // 初始化 数字选择框组件
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged() {
            console.log(this.$refs.numbox.value);
            // 每当数量发生改变，就立即把最新的数量同步到购物车的 store 中，覆盖之前数据
            this.$store.commit('updateCarCount', {
                id: this.goodsid,
                count: this.$refs.numbox.value
            })
        },
        
    },
    props:['buycount', 'goodsid']

}
</script>

<style scoped lang="scss">
.mui-numbox {
      input{ // 火狐浏览器 去除input[type=number]默认的上下箭头icon显示
        -moz-appearance:textfield;
    }
}
</style>
