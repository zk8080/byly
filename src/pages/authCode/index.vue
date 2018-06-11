<template>
    <div class="container">
        <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tips}}</div>
        <div class="weui-cells weui-cells_form">
            <div class="weui-cell weui-cell_phone">
                <div class="weui-cell__hd"><label class="weui-label">手机号</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="number" name="userName" v-model='username' placeholder="请输入手机号"/>
                </div>
            </div>
            <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text"  v-model='authCode' name="authCode" placeholder="请输入验证码"/>
                </div>
                <div class="weui-cell__ft">
                   <button class="weui-vcode-btn" :disabled="disabled" @click="getAuthCode"  data-statu="open">{{time}}</button>
                </div>
            </div>
        </div>
        
        <button class="login_btn" size="default" type="primary" @click="VerifiCode">下一步</button>
        <div class="drawer_screen" @click="powerDrawer" data-statu="close" v-if="showModal"></div> 
        <!--content-->
        <!--使用animation属性指定需要执行的动画-->
        <div :animation="animationData" class="drawer_box" v-if="showModal"> 
        
        <!--drawer content-->
            <div class="drawer_title">填写图形码</div> 
            <div class="drawer_content"> 
                <div class="modal-wrap">
                    <div class="weui-cell__bd">
                        <input class="weui-input" type="text" @change="getVerifyCode" name="verifyCode" v-model="verifyCode" placeholder="请输入图形码"/>
                    </div>
                    <div class="weui-cell__ft">
                        <img :src="'data:image/png;base64,' + imgCode" />
                    </div>
                </div>
            </div> 
            <div class="btn_ok" @click="sendAuthCode" data-statu="close">确定</div> 
        </div>
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
        type: '',
        showTopTips: false,
        tips: '',
        time: '获取验证码',
        currentTime: 61,
        disabled: false,
        imgCode: '',
        showModal: false,
        verifyCode: '',
        animationData: {},
        animation: '',
        timeInterval: ''
    }
  },

  components: {
    // card
  },

  methods: {
        getuserName(e){
            
            this.username = e.target.value;
        },
        getauthCode(e){
            this.authCode = e.target.value;
        },
        getPwd(e){
            this.password = e.target.value;
        },
        getAgainPwd(e){
              this.anaginPwd = e.target.value;
        },
        getVerifyCode(e){
            this.verifyCode = e.target.value;
        },
        showTime(){
            let currentTime = this.currentTime;
            this.timeInterval = setInterval(() => {
                currentTime--;
                this.time = currentTime+'秒';

                if (currentTime <= 0) {
                    clearInterval(this.timeInterval)
                    this.time = '重新发送',
                    this.currentTime = 61,
                    this.disabled = false;   
                }
            }, 1000)  
        },
        showTopTipsFun(tipStr) {
            this.showTopTips = true;
            this.tips = tipStr;
            setTimeout(() => {
                this.showTopTips = false;
                this.tips = "";
            }, 2000)
        },
        cancel(){
            this.showModal = true;
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
        //点击弹窗确认按钮 发送请求发送验证码
        async sendAuthCode(){
            this.util("close");
            let params = {
                phone: this.username,
                type: this.type,
                verifyCode: this.verifyCode,
            }
            const res = await api.querySendCode(params);
            if( res.code == "200" ){
                this.disabled = true;
                this.showTime();
                
            }else{
                // this.showTopTipsFun(res.message);
                let errStr = res.message;
                wx.showToast({
                    title: errStr,
                    icon: 'none',
                    duration: 2000//持续的时间
                })
            }
        },
        //点击获取验证码按钮 获取图形码
        async getAuthCode(){
            
            if(this.username == '' ){
                this.showTopTipsFun('请输入手机号！')
            }else{
                let params = {
                    phone: this.username,
                    type: this.type,
                    verifyCode: '',
                }
                const res = await api.querySendCode(params);
                if( res.code == "200" ){
                    let imgUrl = res.result.value;
                    //清除base64格式中的空格及换行
                    imgUrl = imgUrl.replace(/[\r\n]/g, "");
                    this.imgCode = imgUrl;
                    this.verifyCode = "";
                    // this.showModal = false;
                    this.util("open");
                }else{
                    let errStr = res.message;
                    wx.showToast({
                        title: errStr,
                        icon: 'none',
                        duration: 2000//持续的时间
                    })
                }
            }
            
        },
        //下一步按钮
        async VerifiCode(){
            if(this.username == '' ){
                this.showTopTipsFun('请输入手机号！')
            }
            else if( this.authCode == '' ){
                this.showTopTipsFun('请输入验证码！')
            }
            else{
                
                let params = {
                    phone: this.username,
                    type: this.type,
                    verifyCode: this.authCode,
                }
                const res = await api.querySendCode(params);
                
                // console.log( res, "resresresres" )
                if( res.code == "200" ){
                    const url = `../register/main?type=${this.type}&username=${this.username}&authcode=${this.authCode}`
                    wx.navigateTo({ url })
                }else{
                    let errStr = res.message;
                    wx.showToast({
                        title: errStr,
                        icon: 'none',
                        duration: 2000//持续的时间
                    })
                }
            }
            
        }
  },

  created () {
    // 调用应用实例的方法获取全局数据
  },
  onShow(){
      console.log(111342)
        clearInterval(this.timeInterval);
        this.showModal = false;
        this.time = '获取验证码';
        this.currentTime = 61;
        this.disabled = false;
  },
  onLoad(){
      this.showModal = false;
      this.type = this.$root.$mp.query.type;
      this.username = "";
      this.authCode = "";
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
.weui-cell__ft img{
    width: 150px;
    height: 80px;
    vertical-align: middle;
}

.modal-wrap{
    display: flex;
    align-items: center;
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
  
.top{ 
 padding-top:8px; 
} 
.bottom { 
 padding-bottom:8px; 
} 
.title { 
 height: 30px; 
 line-height: 30px; 
 width: 160rpx; 
 text-align: center; 
 display: inline-block; 
 font: 300 28rpx/30px "microsoft yahei"; 
} 
  
.input_base { 
 border: 2rpx solid #ccc; 
 padding-left: 10rpx; 
 margin-right: 50rpx; 
} 
.input_h30{ 
 height: 30px; 
 line-height: 30px; 
} 
.input_h60{ 
 height: 60px; 
} 
.input_view{ 
 font: 12px "microsoft yahei"; 
 background: #fff; 
 color:#000; 
 line-height: 30px; 
} 

radio{ 
 margin-right: 20px; 
} 
.grid { display: -webkit-box; display: box; } 
.col-0 {-webkit-box-flex:0;box-flex:0;} 
.col-1 {-webkit-box-flex:1;box-flex:1;} 
.fl { float: left;} 
.fr { float: right;}
</style>
