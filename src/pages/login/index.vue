<template>
    <div class="container">
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" name="userName" @input="getUserName" placeholder="请输入手机号"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd">
                    <label class="weui-label">密码</label>
                </div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="password" name="userPwd" @input="getUserPwd" placeholder="请输入密码"/>
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
    }
  },

  components: {
    // card
  },

  methods: {
        getUserName(e){
            this.username = e.target.value;
        },
        getUserPwd(e){
            this.password = e.target.value;
        },
        login(){
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
