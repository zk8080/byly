<template>
    <div class="container">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" placeholder="请输入手机号"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">密码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" placeholder="请输入密码"/>
                </div>
            </div>
        </div>
        <div class="weui-cells__tips">
            <a href="/pages/register/main">
                忘记密码
            </a>
            <a href="/pages/register/main">
                注册
            </a>
        </div>

        <button class="login_btn" size="default" type="primary">登录</button>
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

  },

  created () {
    // 调用应用实例的方法获取全局数据
  }
}
</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.weui-cells_form{
    width: 100%;
    box-sizing: border-box;
}
.weui-cell{
    width: 100%;
    box-sizing: border-box;
}
.weui-cell:before{
    border: none;
}
.weui-cell_phone{
    border-bottom: 1px solid #ccc;
}
.weui-label{
    display: block;
    width: 100px;
}
.weui-cells__tips{
    /* width: 100%; */
    box-sizing: border-box;
    justify-content: space-between;
    display: flex;
    width: 100%;
}
.weui-cells__tips a{
    font-size: 16px;
    color: #119a26;
}
.login_btn{
    color: #fff;
    width: 90%;
    margin-top: 30px;
}
</style>
