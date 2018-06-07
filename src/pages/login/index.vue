<template>
    <div class="container">
        <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tips}}</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" name="username" v-model="username" placeholder="请输入手机号"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">密码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" name="password" v-model="password" placeholder="请输入密码"/>
                </div>
            </div>
        </div>
        <div class="weui-cells__tips">
            <a href="/pages/authCode/main?type=2">
                忘记密码
            </a>
            <a href="/pages/authCode/main?type=1">
                注册
            </a>
        </div>

        <button class="login_btn" size="default" type="primary" @click="login">登录</button>
    </div>
</template>

<script>
import api from '../../utils/api'
export default {
  data () {
    return {
      username: '',
      password: '',
      showTopTips: false,
      tips: '',
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
        login(){
            if( this.username == "" ){
                this.showTopTipsFun('用户名不能为空');
            }else if( this.password == "" ){
                this.showTopTipsFun('密码不能为空');
            }else{
                wx.login({
                    success: (code) => {
                        return new Promise( resolve => {
                            let params = {
                                userName: this.username,
                                userPwd: this.password,
                                code: code.code,
                            };
                            api.queryLogin(params).then( res=> {
                                if( res.code == "200" ){
                                    console.log( 111 )
                                    const data = res.result;
                                    //存储用户信息
                                    wx.setStorageSync( 'loginInfo', data );
                                    const url = "../personal/main";
                                    wx.switchTab({ url });
                                }else{
                                    let errStr = res.message;
                                    wx.showToast({
                                        title: errStr,
                                        icon: 'none',
                                        duration: 2000
                                    });
                                }
                            });
                            
                        })
                    }
                })
            }
            

        //   const res = await api.queryLogin(params);
            //   console.log( res, 'res' )
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
