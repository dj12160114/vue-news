<template>
    <div>
        <mt-swipe :auto="4000">
            <!-- 谁用组件 谁传递 图片列表 -->
            <!-- 此时，涉及 父组件向子组件传值 -->
            <mt-swipe-item v-for="(item, index) in swipeList" :key="index">
            <img :src="item.img" :class="{ 'full': isfull }" >
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    props: ["swipeList", "isfull"]
}
</script>

<style scoped lang="scss"> 
.mint-swipe {
    height: 160px;

    .mint-swipe-item {
        text-align: center;
        img {
            // width: 100%;
            height: 100%;
        }
        
    }
}

.full {
    width: 100%;
}
</style>
