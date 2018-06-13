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
        <div class="drawer_screen" @click="powerDrawer" data-statu="close" v-if="showModal"></div> 
        <!--content-->
        <!--使用animation属性指定需要执行的动画-->
        <div :animation="animationData" class="drawer_box" v-if="showModal"> 
        
        <!--drawer content-->
            <div class="drawer_title">请输入验证码</div> 
            <div class="drawer_content"> 
                <div class="modal-wrap">
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" name="authCode" v-model="authCode" placeholder="请输入验证码"/>
                    </div>
                </div>
            </div> 
            <div class="btn_ok" @click="queryNewEquipment" data-statu="close">确定</div> 
        </div>
    </div>
</template>

<script>
import api from '../../utils/api';
//index.js  
var md5 = require('../../utils/md5.js')  

export default {
  data () {
    return {
        username: '',
        password: '',
        showTopTips: false,
        tips: '',
        showModal: false,
        authCode: '',
        osType: '',
        animationData: {},
        animation: '',
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
        powerDrawer: function (e) { 
            var currentStatu = e.currentTarget.dataset.statu;  
            this.util(currentStatu); 
        }, 
        util: function(currentStatu){ 
            /* 动画部分 */ 
            // 第1步：创建动画实例   
            var animation = wx.createAnimation({ 
                duration: 200,  //动画时长  
                timingFunction: "linear", //线性  
                delay: 0  //0则不延迟  
            });  
            
            // 第2步：这个动画实例赋给当前的动画实例  
            this.animation = animation;  
        
            // 第3步：执行第一组动画  
            animation.opacity(0).rotateX(-100).step();  
        
            // 第4步：导出动画对象赋给数据对象储存  

            this.animationData = animation.export() 
            
            // 第5步：设置定时器到指定时候后，执行第二组动画  
            setTimeout(function () { 
                // 执行第二组动画  
                animation.opacity(1).rotateX(0).step();  
                // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
                this.animationData = animation  
                
                //关闭  
                if (currentStatu == "close") { 
                    this.showModal = false; 
                } 
            }.bind(this), 200) 
            
            // 显示  
            if (currentStatu == "open") { 
                this.showModal = true; 
            } 
        }, 
        login(){
            if( this.username == "" ){
                this.showTopTipsFun('用户名不能为空');
            }else if( this.password == "" ){
                this.showTopTipsFun('密码不能为空');
            }else{
                wx.login({
                    success: (res) => {
                        return new Promise( resolve => {
                            let userPwdStr = md5.hexMD5(this.password);
                            let params = {
                                userName: this.username,
                                userPwd: userPwdStr,
                                code: res.code,
                            };
                            api.queryLogin(params).then( res=> {
                                if( res.code == "200" ){
                                    
                                    const data = res.result;
                                    //存储用户信息
                                    wx.setStorageSync( 'loginInfo', data );
                                    const url = "../personal/main";
                                    wx.switchTab({ url });
                                }else if(res.code == "220"){ 
                                    this.showModal = true;

                                    // const data = res.result;
                                    // //存储用户信息
                                    // wx.setStorageSync( 'loginInfo', data );
                                    // const url = "../personal/main";
                                    // wx.switchTab({ url });
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
        },
        queryNewEquipment(){
            if( this.authCode == '' ){
                wx.showToast({
                    title: errStr,
                    icon: 'none',
                    duration: 2000
                });
            }else{
                console.log( 222222222 )
                wx.login({
                    success: (res) => {
                        if (res.code) {
                            let params = {
                                phone: this.username,
                                authCode: this.authCode,
                                code: res.code,
                                osType: this.osType,
                                authType:  '1',
                            };
                            api.queryNewEquipment(params)
                                .then( res => {
                                    if( res.code == "200" ){
                                        this.showModal = false;
                                        const data = res.result.result;
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
                                } )
                            
                        }
                    }
                });
                
            }
            
        }
  },

  created () {
    // 调用应用实例的方法获取全局数据
  },
  onShow(){

  },
  onLoad(){
        this.username='';
        this.password= '';
        this.showTopTips= false;
        this.tips= '';
        this.showModal = false;
        this.authCode = "";
        let res = wx.getSystemInfoSync()
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
/*mask*/
.drawer_screen { 
 width: 100%; 
 height: 100%; 
 position: fixed; 
 top: 0; 
 left: 0; 
 z-index: 1000; 
 background: #000; 
 opacity: 0.5; 
 overflow: hidden; 
} 
  
/*content*/
.drawer_box { 
 width: 80%; 
 overflow: hidden; 
 position: fixed; 
 top: 50%; 
 left: 0; 
 z-index: 1001; 
 background: #FAFAFA; 
 margin: -50% 10% 0 10%; 
 border-radius: 3px; 
} 
  
.drawer_title{ 
 padding:15px; 
 font: 20px "microsoft yahei"; 
 text-align: center; 
} 
.drawer_content { 
 /* height: 210px;  */
 overflow-y: scroll; /*超出父盒子高度可滚动*/
 padding: 10px;
} 
  
.btn_ok{ 
 padding: 10px; 
 font: 20px "microsoft yahei"; 
 text-align: center; 
 border-top: 1px solid #E8E8EA; 
 color: #3CC51F; 
} 
</style>
