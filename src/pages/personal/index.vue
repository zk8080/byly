<template>
  <div class="container">

    <div class="userinfo" >
      <img class="userinfo-avatar" src="/static/images/avatar.jpg" background-size="cover" />
      <div class="userinfo-nickname">
        <!-- <p v-if="userInfo.nickName">{{userInfo.nickName}}</p>
        <p v-else>
          <a href="/pages/login/main">登录</a>
        </p> -->
        <p v-if="userInfo.userName">
          {{userInfo.userName}}
        </p>
        <p v-else>
          <a href="/pages/login/main">登录</a>
        </p>
      </div>
    </div>
    <div class="company-infor">
      
      <div class="website" @click="gotoOrder">
        <a href="/pages/order/main">
          <div>
            <img src="/static/images/order_01.png" alt="">
            <text>我的订单</text>
          </div>
          <img src="/static/images/arrowright.png" alt="">
        </a>
      </div>
      <div class="about">
        <a href="">
          <div>
            <img src="/static/images/about.png" alt="">
            <text>关于我们</text>
          </div>
          <img src="/static/images/arrowright.png" alt="">
        </a>
      </div>
      <div class="hotline">
        <a href="../service_center/main">
          <div>
            <img src="/static/images/tel.png" alt="">
            <text>服务中心</text>
          </div>
        </a>
      </div>
      <div v-if="userInfo.userName" class="logout">
          <div @click="logout">
            <text>退出账号</text>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {}
    }
  },

  components: {
    // card
  },

  methods: {
    bindViewTap () {
      const url = '../login/main'
      wx.navigateTo({ url })
    },
    gotoOrder(){

      const url = '../order/main';
      wx.switchTab({ url });
    },
    logout(){
      wx.showModal({
        title: '确定退出？',
        content: '退出登录后将无法查看订单，重新登录即可查看',
        confirmText: "确定",
        cancelText: "取消",
        success: function (res) {
          if (res.confirm) {
            wx.clearStorageSync();
            const url = '../personal/main';
            wx.reLaunch({ url });
          } else {
            
          }
        }
      });
    }
  },

  created () {
    
  },
  onShow(){
    console.log(222)
    let storageObj =  wx.getStorageSync("loginInfo"); 
    this.userInfo = storageObj;
  },
  onLoad(){
    console.log(111)
    let storageObj =  wx.getStorageSync("loginInfo"); 
    this.userInfo = storageObj;
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
}
.userinfo {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 20px;
  background-color: #119a26;
  box-sizing:  border-box;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #fff;
  font-size: 16px;
}

.company-infor{
  margin-top: 100px;
  width: 100%;
}
.logout{
  text-align: center;
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  padding: 10px 10px;
}
/* .company-infor .about{
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding: 10px 10px;
  font-size: 16px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.company-infor .website{
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding: 10px 10px;
  font-size: 16px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.company-infor .hotline{
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding: 10px 10px;
  font-size: 16px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
} */
.company-infor a{
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding: 10px 10px;
  font-size: 16px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.company-infor a div{
  flex: 1;
}
.company-infor a div img{
  vertical-align: sub;
  margin-right: 5px;
}
.company-infor a img{
  width: 20px;
  height: 20px;
}
</style>
