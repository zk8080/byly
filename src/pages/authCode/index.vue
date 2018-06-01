<template>
    <div class="container">
        <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tips}}</div>
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
                   <button class="weui-vcode-btn" @click="getAuthCode">{{time}}</button>
                   <!-- <input class="weui-vcode-btn" type="button" :disabled="disabled" @click="getAuthCode" v-model.lazy="time" /> -->
                </div>
            </div>
            <!-- <div class="weui-cell weui-cell_vcode">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" @change="getVerifyCode" name="verifyCode" placeholder="请输入图形码"/>
                </div>
                <div class="weui-cell__ft">
                    <img :src="'data:image/png;base64,' + imgCode" />
                   
                </div>
            </div> -->
        </div>
        <!-- <button class="login_btn" size="default" type="primary" @click="sendAuthCode">确认</button> -->
        <button class="login_btn" size="default" type="primary" @click="VerifiCode">下一步</button>
        <!-- <div :class="showModal == true ? 'modal on': 'modal'" >
            <div class="modal-wrap">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" @change="getVerifyCode" name="verifyCode" placeholder="请输入图形码"/>
                </div>
                <div class="weui-cell__ft">
                    <img :src="'data:image/png;base64,' + imgCode" />
                </div>
            </div>
        </div> -->
        <modal :hidden="showModal" title="填写图形码" confirm-text="确定" cancel-text="返回" @cancel="cancel" @confirm="sendAuthCode">
            <div class="modal-wrap">
                <div class="weui-cell__bd">
                    <input class="weui-input" type="text" @change="getVerifyCode" name="verifyCode" placeholder="请输入图形码"/>
                </div>
                <div class="weui-cell__ft">
                    <img :src="'data:image/png;base64,' + imgCode" />
                </div>
            </div>
        </modal>
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
        showModal: true,
        verifyCode: '',
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
            console.log( 111 )
            let currentTime = this.currentTime;
            let interval;
            interval = setInterval(function () {
                console.log(222)
                currentTime--;
                this.time = currentTime+'秒';
                console.log( this.time, "this.time" )
                if (currentTime <= 0) {
                    clearInterval(interval)
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
        // //点击弹窗确认按钮 发送请求发送验证码
        // async sendAuthCode(){
        //     console.log( 111 )
        //     let params = {
        //         phone: this.username,
        //         type: this.type,
        //         verifyCode: this.verifyCode,
        //     }
        //     const res = await api.querySendCode(params);
        //     console.log( res, "resres" )
        //     if( res.code == "200" ){

        //     }
        // },
        // //点击获取验证码按钮 获取图形码
        // async getAuthCode(){
        //     // this.disabled = true;
        //     // this.showTime();
        //     // console.log( this.time, "this.time" )
        //     let params = {
        //         phone: this.username,
        //         type: this.type,
        //         verifyCode: '',
        //     }
        //     const res = await api.querySendCode(params);
        //     if( res.code == "200" ){
        //         let imgUrl = res.result.value;
        //         //清除base64格式中的空格及换行
        //         imgUrl = imgUrl.replace(/[\r\n]/g, "");
        //         this.imgCode = imgUrl;
        //         this.showModal = false;
        //     }
        // },
        //下一步按钮
        async VerifiCode(){
            if(this.username == '' ){
                this.showTopTipsFun('请输入手机号！')
            }else if( this.authCode == '' ){
                this.showTopTipsFun('请输入验证码！')
            }else{
                
                let params = {
                    phone: this.username,
                    type: this.type,
                    verifyCode: this.authCode,
                }
                // const res = await api.querySendCode(params);
                
                // console.log( res, "resresresres" )
                // if( res.code == "200" ){
                    const url = `../register/main?type=${this.type}&username=${this.username}&authcode=${this.authCode}`
                    wx.navigateTo({ url })
                // }
            }
            
        }
  },

  created () {
    // 调用应用实例的方法获取全局数据
  },
  onLoad(){
      this.type = this.$root.$mp.query.type;
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

</style>
