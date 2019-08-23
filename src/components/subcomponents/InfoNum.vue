<template>
    <div class="mui-numbox" data-numbox-min='1' >
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" 
               type="number" value="1" @change="countChanged"
               ref="numbox"/>
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    props:['max'],
    watch: {
        'max': function(newVal, oldVal) {
            mui('.mui-numbox').numbox().setOption('max', newVal);
            console.log(this.max)
        }
    },
    mounted() {
        // 初始化 数字选择框组件
        mui('.mui-numbox').numbox();
    },
    methods: {
        countChanged() {
            // 每当 文本框的数据 被修改的时候，立即把最新的数据通过事件调用传递给父组件
            // console.log(this.$refs.numbox.value)
            this.$emit('getcount', parseInt(this.$refs.numbox.value))
        },
        
    }

}
</script>

<style scoped lang="scss">
.mui-numbox {
      input{ // 火狐浏览器 去除input[type=number]默认的上下箭头icon显示
        -moz-appearance:textfield;
    }
}
</style>
