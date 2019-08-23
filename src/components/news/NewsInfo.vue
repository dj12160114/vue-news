<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ newsinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
            <span>点击：{{ newsinfo.click }}次</span>
        </p>

        <hr>

        <div class="content" v-html="newsinfo.content">

        </div>
        <!-- 评论子组件区域 -->
        <comment :id="this.id"></comment>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
import Comment from '../subcomponents/Comments.vue'

export default {  
    data() {
        return {
            // 将 url 传递过来的id值挂载到 data上，便于调用
            id: this.$route.params.id,
            newsinfo: {}
        }
    },
    components: {
        'comment': Comment
    },
    created() {
        this.getNewsInfo()
    },
    methods: {
        getNewsInfo() {
            this.$http.get('api/getnew/' + this.id).then(result => {
                if(result.body.status === 0){
                    this.newsinfo = result.body.message[0]
                } else {
                    Toast('新闻详情获取失败！')
                }
            }) 
        }
    }

}
</script>

<style  lang="scss">
.newsinfo-container {
    padding: 0 4px;

    .title {
        font-size: 16px;
        text-align: center;
        margin: 15px 0;
        color: red;
    }
    .subtitle {
        font-size: 12px;
        color: #226aff;
        display: flex;
        justify-content: space-between;
    }

    .content {
        img {
            width: 100%;
        }
    }
}
</style>
