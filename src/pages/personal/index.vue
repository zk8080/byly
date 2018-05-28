<template>
  <div class="container">

    <div class="userinfo" >
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <!-- <p v-if="userInfo.nickName">{{userInfo.nickName}}</p>
        <p v-else>
          <a href="/pages/login/main">登录</a>
        </p> -->
        <p>
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
        <a href="/pages/order/main">
          <div>
            <img src="/static/images/about.png" alt="">
            <text>关于我们</text>
          </div>
          <img src="/static/images/arrowright.png" alt="">
        </a>
      </div>
      <div class="hotline">
        <a href="/pages/order/main">
          <div>
            <img src="/static/images/tel.png" alt="">
            <text>服务热线</text>
          </div>
        </a>
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

      const url = '../order/main'
      wx.switchTab({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.userInfo = res.userInfo
            }
          })
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    }
  },

  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
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
