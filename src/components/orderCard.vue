<template>
  <div>
    <div class="order-item">
        <!-- <div class="header">
            <text class="fl">订单编号：{{orderData.orderNo}}</text>
            <text class="fr">{{orderData.status}}</text>  
        </div> -->
        <div class="order-detail">
            <div class="order-img">
                <!-- <img src="" alt=""> -->
            </div>
            <div class="order-title">
                <text class="title">{{orderData.commodity_name}}</text>
                <div class='totalprice'>
                    <text class="num">{{orderData.commodity_describe}}</text>
                </div>
            </div>
        </div>
        <div class="time">
                <text>{{orderData.time}}</text>
        </div>
        <!-- <div class="address">
                <text>地址：{{orderData.address}}</text>
        </div> -->
        <a :href="'/pages/order_detail/main?cardId=' + orderData.cardId + '&aging=' + aging">
            <div class="ewm clearfix">
              <text class="price">¥{{orderData.commoDitycost}}</text>
              <text class="fr">查看二维码></text>
            </div>
        </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['orderData', 'aging']
}
</script>

<style>
.order-item{
  border: 1px solid #ccc;
  border-radius: 6rpx;
  /* box-shadow: 0 0 4rpx #888888; */
  padding: 10rpx 0;
  margin-bottom: 20rpx;
}
.order-item .header{
  font-size: 24rpx;
  color: #ccc;
  padding: 10rpx 20rpx;
  display: flex;
  justify-content: space-between;
}
.order-detail{
  display: flex;
  padding: 6rpx 20rpx;
  position: relative;
}
.order-detail .order-img{
  width: 180rpx;
  height: 180rpx;
}
.order-detail .order-title{
  flex: 1;
  margin-left: 20rpx;
  position: relative;
  text-align: left;
}
.order-title .title{
  display: block;
  margin-top: 50rpx;
  font-size: 32rpx;
}
.order-title .totalprice{
  font-size: 32rpx;
  
}
.order-title .totalprice .num{
  color: #707070;
  /* margin-right: 10rpx; */
}
/* .order-title .totalprice .price{
  color: #d81e06;
} */
.time{
  padding: 0 20rpx;
  color: #707070;
  font-size: 28rpx;
}
.address{
  padding: 0 20rpx;
  color: #707070;
  font-size: 28rpx;
  margin-bottom: 10rpx;
}
.ewm{
  text-align: right;
  padding: 10rpx 20rpx;
  border-top: 1px solid #ccc;
  font-size: 32rpx;
  color: #119a26;
  display: flex;
  justify-content: space-between;
}
.ewm .price{
  color: red;
}
</style>
