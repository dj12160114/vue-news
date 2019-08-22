<template>
    <div>
       <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0? 'mui-active': '']" 
                       v-for="item in imgTitles" 
                       :key="item.id" @click="getImgListByTitleId(item.id)">
                        {{ item.title }}
                    </a>
                </div>
            </div>
        </div>


        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <router-link tag="li" :to="'/home/photoinfo/' + item.id" v-for="item in imgList" :key="item.id">
                <img v-lazy="item.img_url" class="lazy">
                <div class="info">
                    <h1 class="info-title">{{ item.title }}</h1>
                    <div class="info-body">{{ item.zhaiyao }}</div>
                </div>
            </router-link>
        </ul>

    </div>
</template>

<script>
import mui from '../../lib/mui/js/mui.min.js'
import { Toast } from 'mint-ui'

export default {
    data() {
        return {
            imgTitles: [],
            imgList: []
        }
    },
    methods: {
        getTitleList() {
            this.$http
            .get('api/getimgcategory')
            .then(result => {
                if(result.body.status === 0) {
                    result.body.message.unshift({ id: 0, title: '全部'})
                    this.imgTitles = result.body.message
                } else { 
                    Toast('获取图片标题列表失败！')
                }
            })
        },
        // 根据分类id获取图片列表
        getImgListByTitleId(titleid) {
            this.$http.get('api/getimages/' + titleid)
            .then(result => {
                if(result.body.status === 0) {
                    this.imgList = result.body.message
                    console.log(this.imgList)
                } else { 
                    console.log(result.body)
                    Toast('获取图片列表失败！')
                }
            })
        }
    },
    created() {
        this.getTitleList(),
        // 默认进入页面，展示【全部】标签下的所有图片列表数据
        this.getImgListByTitleId(0)
    },
    // 组件的 dom 结构被渲染好并放到页面中后会执行这个钩子函数
    mounted() {
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }

}
</script>

<style scoped lang="scss">
.photo-list {
    list-style: none;
    padding: 10px;
    margin: 0;
    padding-bottom: 0;
    li{        
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
       
        img {
            width: 100%;
            vertical-align: middle;
        }
        .lazy[lazy="loading"] {
            // width: 40px;
            height: 300px;
            margin: auto;
        }

        .info {
            max-height: 90px;
            color: #fff;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,0.4);
            padding: 6px;
            .info-title {
                font-size: 14px;
            }

            .info-body {
                font-size: 12px;
            }
        }
    } 
}



</style>
