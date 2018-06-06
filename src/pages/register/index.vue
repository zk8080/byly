<template>
    <div class="container">
        <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tips}}</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">密码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" name="userPwd" v-model="password" placeholder="请输入密码"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">确认密码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" name="userPwd"  v-model="againPwd" placeholder="请再次输入密码"/>
                </div>
            </div>
        </div>
        <div class="weui-cells__tips">
            <a href="/pages/login/main">
                已有账号，去登录！
            </a>
        </div>

        <button class="login_btn" size="default" type="primary" @click="regisiter">注册</button>
    </div>
</template>

<script>
import api from '../../utils/api';
// import config from '../../config.js'

export default {
  data () {
    return {
        username:'',
        authCode: '',
        password: '',
        type: '',
        againPwd: '',
        showTopTips: false,
        tips: '',
        osType: '',
    }
  },

  components: {
    // card
  },

  methods: {
        showTopTipsFun(tipStr) {
            this.showTopTips = true;
            this.tips = tipStr;
            setTimeout(() => {
                this.showTopTips = false;
                this.tips = "";
            }, 2000)
        },
        regisiter(){
            if( this.password != this.againPwd ){
                this.showTopTipsFun("两次密码不一样！");
            }else{
                wx.login({
                    success: (code) => {
                        let params = {
                            userName: this.username,
                            userPwd: this.password,
                            authCode: this.authCode,
                            type: this.type,
                            code: code.code,
                            osType: this.osType,
                        };
                        api.queryRegister(params)
                            .then( res => {
                                if( res.code == "200" ){
                                    let successStr = res.message;
                                    wx.showToast({
                                        title: successStr,
                                        icon: 'none',
                                        duration: 2000//持续的时间
                                    })
                                }else{
                                    let errStr = res.message;
                                    wx.showToast({
                                        title: errStr,
                                        icon: 'none',
                                        duration: 2000//持续的时间
                                    })
                                }
                            })
                            .catch( err => {
                                console.log(err)
                            })   
                        
                    }
                })   
            }
            
            
        }
  },

  created () {
    // 调用应用实例的方法获取全局数据
  },
  onLoad(){
        let queryObj = this.$root.$mp.query;
        this.username = queryObj.username;
        this.authCode = queryObj.authcode;
        this.type = queryObj.type;
        var res = wx.getSystemInfoSync()
        if( res.platform == "ios" ){
            this.osType = 2;
        }else if( res.platform == "android" ){
            this.osType = 1;
        }
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
