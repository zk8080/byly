<template>
    <div class="container">
        <div class="weui-toptips weui-toptips_warn" v-if="showTopTips"></div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" name="userName" @change="getuserName" placeholder="请输入手机号"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" @change="getauthCode" name="authCode" placeholder="请输入验证码"/>
                </div>
                <div class="weui-cell__ft">
                   <button class="weui-vcode-btn" @click="sendAuthCode">获取验证码</button>
                </div>
            </div>
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" name="userPwd" @change="getPwd" placeholder="请输入密码"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">确认密码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" name="userPwd" @change="getAgainPwd" placeholder="请再次输入密码"/>
                </div>
            </div>
        </div>
        <div class="weui-cells__tips">
            <a href="/pages/login/main">
                已有账号，去登录！
            </a>
        </div>

        <button class="login_btn" size="default" type="primary" @clicl="regisiter">注册</button>
    </div>
</template>

<script>
import api from '../../utils/api';

export default {
  data () {
    return {
        username:'',
        authCode: '',
        password: '',
        showTopTips: false,
    }
  },

  components: {
    // card
  },

  methods: {
        getuserName(e){
            
            this.username = e.target.value;
            console.log( this.username, "this.username" )
        },
        getauthCode(e){
            this.authCode = e.target.value;
        },
        getPwd(e){
            this.password = e.target.value;
        },
        getAgainPwd(e){
            let againPwd = e.target.value;
            if( this.password != againPwd ){
                this.showTopTipsFun();
            }else{
                this.password = e.target.value;              
            }
            //   this.username = e.target.value;
        },
        showTopTipsFun() {
            this.showTopTips = true;
            setTimeout(() => {
                this.showTopTips = false;
            }, 2000)
        },
        async sendAuthCode(){
            let params = {
                phone: this.username,
                type: 1,
                verifyCode: '',
            }
            const res = await api.querySendCode(params);
            console.log( res, "resres" )
        },
        async regisiter(){
            let params = {
                userName: this.username,
                userPwd: this.password,
                authCode: this.authCode,
                type: 1,
            }
            const res = await api.queryRegister(params)
        }
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
.weui-cell_vcode{
    padding-right: 15px;
    border-bottom: 1px solid #ccc;
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
.weui-vcode-btn{
    border: 1px solid #119a26;
    background-color: #fff;
    color: #119a26;
}
</style>
