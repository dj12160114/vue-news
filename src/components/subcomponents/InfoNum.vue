<template>
    <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
        <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
        <input id="test" class="mui-input-numbox" type="number" value="1" />
        <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted() {
        // 初始化 数字选择框组件
        mui('.mui-numbox').numbox();
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
