<template>
  <div class="container">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <p v-if="userInfo.nickName">{{userInfo.nickName}}</p>
        <p v-else>
          <a href="javascript:;">登录</a>
        </p>
      </div>
    </div>
    <div class="company-infor">
      <div class="about">
        <text>关于我们</text>
        <img src="/static/images/arrowright.png" alt="">
      </div>
      <div class="website">
        <text>官方网站</text>
      </div>
      <div class="hotline">
        <text>服务热线</text>
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
      const url = '../logs/main'
      wx.navigateTo({ url })
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
.company-infor div{
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  padding: 10px 20px;
  font-size: 16px;
  width: 100%;
  display: flex;
  box-sizing: border-box;
}
.company-infor div text{
  flex: 1;
}
.company-infor div img{
  width: 20px;
  height: 20px;
}
</style>
