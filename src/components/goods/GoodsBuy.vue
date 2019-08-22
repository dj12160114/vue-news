<template>
    <div class="goods-list">
        <div class="goods-item">
            <img src="../../images/1.jpg" >
            <h1 class="goods-title">小米</h1>
            <div class="goods-info">
                <p class="goods-price">
                    <span class="goods-price-now">￥2199</span>
                    <span class="goods-price-old">￥2399</span>
                </p>
                <p class="goods-sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="../../images/1.jpg" >
            <h1 class="goods-title">小米</h1>
            <div class="goods-info">
                <p class="goods-price">
                    <span class="goods-price-now">￥2199</span>
                    <span class="goods-price-old">￥2399</span>
                </p>
                <p class="goods-sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>

        <div class="goods-item">
            <img src="../../images/1.jpg" >
            <h1 class="goods-title">小米</h1>
            <div class="goods-info">
                <p class="goods-price">
                    <span class="goods-price-now">￥2199</span>
                    <span class="goods-price-old">￥2399</span>
                </p>
                <p class="goods-sell">
                    <span>热卖中</span>
                    <span>剩60件</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {


}
</script>

<style scoped lang="scss">
.goods-list {
    padding: 7px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .goods-item { 
        width: 49%;
        min-height: 293px;
        padding: 2px;
        border: 1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin: 3px 0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        img {
            width: 100%;
        }
        .goods-title {
            font-size: 14px;
        }
        .goods-info {
            
            p{
                margin: 0;
                padding: 5px;
            }
            background-color: #eee;
            .goods-price {
                .goods-price-now {
                    color: red;
                    // font-weight: bold;
                    font-size: 14px;
                }
                .goods-price-old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }

            }

            .goods-sell{
                display: flex;
                justify-content: space-between;
                font-size: 12px;
            }
        }

    }
    
}
</style>
