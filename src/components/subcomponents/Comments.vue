<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea maxlength="120" placeholder="请输入评论内容（最多吐槽120字）" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComments">发表评论</mt-button>
        <div class="cmt-list" v-for="(item, index) in comments" :key="index"> 
            <div class="cmt-item">
                <div class="cmt-title">
                    第{{ index+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;
                    发表时间：{{ item.add_time | dateFormat }}
                </div>
                <div class="cmt-body">
                   {{ item.content === 'undefined'? '此用户很懒，没有评论': item.content }}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui'
export default {
    data() {
        return {
            // 默认展示第一页数据
            pageIndex: 1,
            // 所有的评论数据
            comments: [],
            // 评论输入的内容
            msg: ''
        }
    },
    props: ['id'],
    created() {
        this.getComments()
    },
    methods: {
        getComments() {
            this.$http.get('api/getcomments/'+ this.id + '?pageIndex=' + this.pageIndex)
            .then(result => {
                if(result.body.status === 0){
                    console.log(result.body.message)
                    // this.comments = result.body.message
                    // 防止点击 加载更多后 清空老评论数据
                    this.comments = this.comments.concat(result.body.message)
                } else { 
                    console.log(result)
                    Toast('新闻评论获取失败！')
                }
            })
        },
        getMore() {
            this.pageIndex++;
            this.getComments();
        },
        postComments() {
            if(this.msg.trim().length === 0) {
                return Toast('评论内容不能为空！')
            }

            this.$http
            .post('api/postcomment/' + this.id, { content: this.msg.trim() })
            .then(function(result) {
                if(result.body.status === 0) {
                    var cmt = { 
                        user_name: '匿名用户', 
                        add_time: Date.now(),
                        content: this.msg.trim() 
                        }
                    this.comments.unshift(cmt)
                    this.msg = ''
                } else {
                    console.log(result.body)
                    Toast('评论提交失败')
                }
            })

        }
    }

}
</script>

<style scoped lang="scss">
.cmt-container{
    h3{
        font-size: 16px;
    }

    textarea {
        font-size: 14px;
        height: 84px;
        margin: 0;
    }

    .cmt-list {
        margin: 6px 0;
        font-size: 14px;
        .cmt-item{
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }

            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
