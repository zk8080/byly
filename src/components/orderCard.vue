<template>
  <div>
    <a :href="'/pages/order_detail/main?cardId=' + orderData.cardId + '&aging=' + aging">
      <div class="order-item"  >
        <!-- <div class="header">
            <text class="fl">订单编号：{{orderData.orderNo}}</text>
            <text class="fr">{{orderData.status}}</text>  
        </div> -->
        <div class="order-detail">
            <div class="order-img">
                <img src="/static/images/order_img.png">
            </div>
            <div class="order-title">
                <text class="title">{{orderData.commodity_name}}</text>
                <div class='describe'>
                    <text class="num">{{orderData.commodity_describe}}</text>
                </div>
                <div class='company_name'>
                    <text class="num">{{orderData.company_name}}</text>
                </div>
            </div>
        </div>
        <!-- <div class="time">
                <text>{{orderData.time}}</text>
        </div> -->
        <!-- <div class="address">
                <text>地址：{{orderData.address}}</text>
        </div> -->
        
        <div class="ewm clearfix">
          <text class="price">¥{{orderData.commoDitycost}}</text>
          <text class="fr">查看二维码></text>
        </div>
      </div>
    </a>
    
  </div>
</template>

<script>
export default {
  props: ['orderData', 'aging']
}
</script>

<style>
.order-item{
  border: 1px solid #fff;
  border-radius: 6rpx;
  /* box-shadow: 0 0 4rpx #888888; */
  padding-top: 5px;
  margin-bottom: 20rpx;
  background-color: #50B0E6;
}
/* .order-item .header{
  font-size: 24rpx;
  color: #fff;
  padding: 10rpx 20rpx;
  display: flex;
  justify-content: space-between;
} */
.order-detail{
  display: flex;
  padding: 6rpx 20rpx;
  position: relative;
  color: #fff;
}
.order-detail .order-img{
  display: flex;
  align-items: center;
  width: 180rpx;
  height: 180rpx;
}
.order-img img{
  width: 100%;
  height: 133rpx;
}
.order-detail .order-title{
  flex: 1;
  margin-left: 20rpx;
  position: relative;
  text-align: left;
  overflow: hidden;
}
.order-title .title{
  display: block;
  /* margin-top: 50rpx; */
  font-size: 22px;
  color:#FFE21E;
}
.order-title .describe{
  width: 100%;
  font-size: 14px;
  text-overflow: ellipsis;
  overflow:hidden;
  white-space:nowrap;
}
.company_name{
  font-size: 22px;
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
  color: #fff;
  font-size: 28rpx;
}
.address{
  padding: 0 20rpx;
  color: #fff;
  font-size: 28rpx;
  margin-bottom: 10rpx;
}
.ewm{
  text-align: right;
  padding: 10rpx 20rpx;
  border-top: 1px solid #fff;
  font-size: 32rpx;
  /* color: #119a26; */
  display: flex;
  justify-content: space-between;
  color: #fff;
}
.ewm .price{
  /* color: red; */
  
}
</style>
