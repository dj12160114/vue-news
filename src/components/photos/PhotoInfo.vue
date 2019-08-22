<template>
    <div class="photoinfo-container">
        <h3>{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
            <span>点击：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <vue-preview :slides="list" class="thumbs" @close="handleClose"></vue-preview>
   

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content"></div>

        <!-- 评论子组件 -->
        <comment :id="id"></comment>
    </div>
</template>

<script>
import Comment from '../subcomponents/Comments.vue'
import '../../thumbs.scss'
export default {
    data() {
        return {
            id: this.$route.params.id,
            photoinfo: {},
            list:[]
        }
    },
    created() {
        this.getPhotoInfo(),
        this.getThumbs()
    },
    components: {
        'comment': Comment
    },
    methods: {
        getPhotoInfo() {
            this.$http.get('api/getimageInfo/' + this.id)
            .then(result => {
                 if(result.body.status === 0) {
                    this.photoinfo = result.body.message[0]
                } else { 
                    Toast('获取图片详情失败！')
                }
            })
        },
        getThumbs() {
            this.$http.get('api/getthumimages/' + this.id)
            .then(result => {
                 if(result.body.status === 0) {
                      result.body.message.forEach(item => {
                        item.w = 600
                        item.h = 400
                        item.msrc = item.src
                    });
                    console.log(result.body)
                    this.list = result.body.message
                } else { 
                    Toast('获取图片详情失败！')
                }
            })
        },
        handleClose () {
            console.log('close event')
        }
    }

}
</script>

<style scoped lang="scss">

.photoinfo-container{
    padding: 3px;
    h3 {
        color: #26a2ff;
        font-size: 14px;
        text-align: center;
        margin: 15px 0;
    }

    .subtitle {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }

    .content {
        font-size: 12px;
        line-height: 30px;
    }
}
</style>
