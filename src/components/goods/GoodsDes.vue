<template>
    <div class="goodsdes-container">
        <h3>{{ goodsdes.title }}</h3>
        <hr>
        <div v-html="goodsdes.content" class="content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id: this.$route.params.id,
            goodsdes: {}
        }
    },
    methods: {
        getGoodsDes() {
            this.$http.get('api/goods/getdesc/' + this.id)
            .then(result => {
                if(result.body.status === 0) {
                    // console.log(result.body.message)
                    this.goodsdes = result.body.message[0]
                } else {
                    Toast('图文详情获取失败！')
                }
            })
        }
    },
    created() {
        this.getGoodsDes()
    }

}
</script>

<style lang="scss">
.goodsdes-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        margin: 15px 0;
        text-align: center;
    }

    .content {
        img {
            display: inline-block;
            width: 100%;
        }
    }
}
</style>
