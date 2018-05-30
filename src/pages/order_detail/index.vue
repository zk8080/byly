<template>
  <div class="container">
    <div class="voucher">
        <div class="ewm">
        <image src="/static/images/erweima.png"/>
        <text>在使用时请出示该二维码</text>
        </div>
        <div class="detail-cont">
        <div class="order-num">
            <text class="l-cont">订单编号</text>
            <text>9778976546</text>
        </div>
        <div class="title">
            <text class="l-cont">订单名称</text>
            <text>XXX地铁站——福寿园</text>
        </div>
        <div class="time">
            <text class="l-cont">日期</text>
            <text>2018-01-08 09:00</text>
        </div>
        <div class="address">
            <text class="l-cont">地点</text>
            <text>上海市浦东新区临港新城杞青路1717号</text>
        </div>
        <!-- <div class="username">
            <text class="l-cont">姓名</text>
            <text>{{}}</text>
        </div>
        <div class="tel">
            <text class="l-cont">电话</text>
            <text>{{tel}}</text>
        </div> -->
        </div>
    </div>
  </div>
</template>

<script>


export default {
  components: {

  },

  data () {
    return {
      
    }
  },

  created () {

  }
}
</script>

<style>
.container{
  height: 100%;
  background-color: #eee;
}
.voucher{
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  margin: 20rpx;
}
.voucher .ewm{
  border-bottom: 1px solid #ccc;
  text-align: center;
  position: relative;
}
.voucher .ewm image{
  margin-top: 40rpx;
  width: 256rpx;
  height: 256rpx;
}
.voucher .ewm text{
  display: block;
  font-size: 28rpx;
  color: #ccc;
  margin-bottom: 8rpx;
}
.ewm::before{
  content: "";
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #eee;
  position: absolute;
  right: -35rpx;
  bottom: -15rpx;
  background-color: #eee;
}
.ewm::after{
  content: "";
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #eee;
  position: absolute;
  left: -35rpx;
  bottom: -15rpx;
  background-color: #eee;
}
.detail-cont text{
  padding: 10rpx;
  font-size: 28rpx;
}
.detail-cont .l-cont{
  display: inline-block;
  width: 140rpx;
  color: #505050;
}
</style>
