<template>
  <div class="container">
    
    <div class="voucher">
        <div class="title">
          <p>{{dataObj.commodity_name}}</p>
        </div>
        <div class="price">
          <p>价格：¥{{dataObj.commoDitycost}}</p>
        </div>
        <div class="ewm">
          <view class="canvas-box">
            <canvas style="width: 686rpx;height: 686rpx;background:#f1f1f1;" canvas-id="mycanvas"/>
          </view>
        <text>{{dataObj.card_uniqueness}}</text>
        </div>
        <div class="time">
            <p>{{dataObj.time}}</p>
        </div>
        <div class="address">
            <p>{{dataObj.commodity_describe}}</p>
        </div>
        <div class="timer">
          <p v-if="errorFlag" class="error">
            该二维码已失效，请重新查看二维码
          </p> 
          <p v-else>二维码仅可使用一次（{{timer}}s失效）</p>
          
        </div>
      </div>
  </div>
</template>

<script>

import api from '../../utils/api.js';
import QR from '../../utils/qrcode.js'


export default {
  components: {

  },

  data () {
    return {
      userId: '',
      cardId: '',
      dataObj: {},
      timer: 120,
      aging: 120,
      interval: '',
      errorFlag: false,
    }
  },
  methods: {
    async getData(){
      let params = {
        cardId: this.cardId,
        userId: this.userId,
      }
      const res = await api.queryDynamicCode(params);
      if( res.code == "200" ){
        this.setTimer();
        this.dataObj = res.result;
        this.creatCanvas();
      }
    },
    //适配不同屏幕大小的canvas
    setCanvasSize:function(){
      var size={};
      try {
          var res = wx.getSystemInfoSync();
          var scale = 750/686;//不同屏幕下canvas的适配比例；设计稿是750宽
          var width = res.windowWidth/scale;
          var height = width;//canvas画布为正方形
          size.w = width;
          size.h = height;
        } catch (e) {
          // Do something when catch error
          console.log("获取设备信息失败"+e);
        } 
      return size;
    } ,
    createQrCode:function(url,canvasId,cavW,cavH){
      //调用插件中的draw方法，绘制二维码图片
      QR.api.draw(url,canvasId,cavW,cavH);
      setTimeout(() => { this.canvasToTempImage();},1000);
      
    },
    //获取临时缓存照片路径，存入data中
    canvasToTempImage:function(){
      var that = this;
      wx.canvasToTempFilePath({
        canvasId: 'mycanvas',
        success: function (res) {
            var tempFilePath = res.tempFilePath;
            console.log(tempFilePath);
            that.imagePath = tempFilePath;
        },
        fail: function (res) {
            console.log(res);
        }
      });
    },
    creatCanvas: function() {
      // var that = this;
      var url = this.dataObj.card_uniqueness;
      var size = this.setCanvasSize();
      //绘制二维码
      this.createQrCode(url,"mycanvas",size.w,size.h);
    },
    setTimer: function(){
      let aging = this.aging;
      // console.log( aging, "aging" )
      this.interval = setInterval(() => {
          aging--;
          this.timer = aging;
          if (aging <= 0) {
              clearInterval(this.interval)
              this.errorFlag = true;
          }
      }, 1000)
    }
  },
  created () {

  },
  onshow(){
    let storageObj =  wx.getStorageSync("loginInfo"); 
    this.cardId = storageObj.userId;
    clearInterval(this.interval);
    // this.aging = 120;
    this.getData();
  },
  onLoad(){
    let storageObj =  wx.getStorageSync("loginInfo"); 
    this.userId = storageObj.userId;
    let cardId = this.$root.$mp.query.cardId;
    this.cardId = cardId;
    let aging = this.$root.$mp.query.aging;
    
    this.aging = aging;
    this.timer = aging;
    this.getData();
  },
  onUnload(){
    clearInterval(this.interval);
  },
}
</script>

<style>
.container{
  height: 100%;
  background-color: #eee;
  padding: 10px;
}
.voucher{
  background-color: #fff;
  border-radius: 10rpx;
  padding: 20rpx;
  width: 100%;
  box-sizing:border-box;
}
.voucher div{
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items:center;
    font-size: 16px;
    line-height:32px;
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
  color: #000;
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
.price{
  color: red;
}
.time{
  color: #119a26;
}
.detail-cont .l-cont{
  display: inline-block;
  width: 140rpx;
  color: #505050;
}
</style>
