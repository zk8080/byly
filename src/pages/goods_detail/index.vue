<template>
    <div :class="showFullPage?'container cur':'container'">
        <div class="weui-toptips weui-toptips_warn" v-if="showTopTips">{{tips}}</div>
        <swiper indicator-dots="true"
            autoplay="true">
            <swiper-item v-for=" (item, index) in scroll_imgList" :key="index">
                <image :src="baseUrl + item.imageUrl" class="slide-image"/>
            </swiper-item>
        </swiper>
        <div class="goods_header">
            <div class="goods_title">
                <p>{{dataList.commodity_name}}</p>
                <div>
                    <button class="share_btn" open-type='share'>
                        <img src="/static/images/share.png" alt="">
                    </button>
                </div>
            </div>
            <div class="goods_attentions">
                <p>{{dataList.commodity_describe }}</p>
            </div>
            <div class="goods_price">
                <p>¥ {{dataList.terminalPrice}}<span>(优惠价)</span></p>
            </div>
        </div>
        <div class="order-detail">
            <div class="recommend-user" v-if="dataList.commodity_type_id == '228'">
                <text>推荐人:</text>
                <div class="recommend-input">
                    <div>
                        <input type="text" name="carRecommendBusinessName" v-model="carRecommendBusinessName" placeholder="请输入推荐人"/>
                    </div>
                </div>
            </div>
            <div class="recommend-business" v-if="dataList.commodity_type_id == '228'">
                <text>门店:</text>
                <div class="recommend-input">
                    <div>
                        <input type="text" name="carRecommendUser" v-model="carRecommendUser" placeholder="请输入门店"/>
                    </div>
                </div>
            </div>
            <div class="order-num clearfix">
                <text class="fl">数量</text>
                <div class="num-input fr clearfix">
                    <div class="num-box">
                        <img src="/static/images/jian.png" @click='jian'/>
                        <input disabled='true' name="commoDityCount" :value='commoDityCount'/>
                        <img src="/static/images/add.png" @click='add'/>
                    </div>
                </div>
            </div>
        </div>
        <div class="pay_way">
            <img src="/static/images/pay.png" alt="">
            <span>支持微信支付</span>
        </div>

        <div class="describe" v-for="(item, index) in describeImg" :key="index">
            <image mode="widthFix"  :src="baseUrl + item.imageUrl" alt="" />
        </div>
        <div class="order">
            <div class="order-btn" @click='gotoPay'>
                <text>立即购买</text>
            </div>
        </div>
        <div v-if="showBack" class="back-home" @click="goHome">
          <img src="/static/images/back.png" alt="">
          <p>返回首页</p>
        </div>
    </div>
</template>

<script>
import api from '../../utils/api.js'
import qs from 'qs';
export default {
    data() {
        return {
            dataList:{},
            scroll_imgList: [],
            baseUrl: this.$baseUrl,
            describeImg: [],
            orderShow: false,
            orderEnd: false,
            showFullPage: false,
            lazy: true,
            commoDityCount: 1,
            userInfo: {},
            carRecommendUser: '',
            carRecommendBusinessName: '',
            showTopTips: false,
            tips: '',
            showBack: false,
        }
    },
    computed: {

    },
    methods: {

        jian: function () {
            if (this.commoDityCount <= 1){
                this.commoDityCount = 1;
            }else{

                var num = this.commoDityCount - 1;
                this.commoDityCount = num;
            }

        },
        add: function () {
            this.commoDityCount ++;
        },
        showTopTipsFun(tipStr) {
            this.showTopTips = true;
            this.tips = tipStr;
            setTimeout(() => {
                this.showTopTips = false;
                this.tips = "";
            }, 2000)
        },
        gotoPay(){
            if( this.userInfo.openId ){
                if( this.dataList.commodity_type_id == '228' ){
                    if( this.carRecommendBusinessName == '' || this.carRecommendUser == '' ){
                        this.showTopTipsFun('推荐人或者推荐店铺不能为空');
                        return;
                    }
                }

                let params = '';
                let jsons = {
                        businessId: this.dataList.business_company_id,
                        userId: this.userInfo.userId,
                        smallAcessToken: this.userInfo.smallAcessToken,
                        smallUserkey: this.userInfo.smallUserkey,
                        commoDityCount: this.commoDityCount,
                        openId: this.userInfo.openId,
                        commoDityId: this.dataList.commodity_id,
                        carType: this.dataList.commodity_distinction,
                        carRecommendBusinessName: this.carRecommendBusinessName,
                        carRecommendUser: this.carRecommendUser,
                    }
                console.log( jsons, "jsons" )
                //将对象转成json字符串， 不然后台无法拿到参数 参数会变成jsons[key]=value 后台需要jsons={key:value}
                jsons = JSON.stringify(jsons);
                params = {
                    'jsons': jsons
                }

                api.queryCarCouponIndentDispose(params)
                    .then( res => {
                        // console.log(res, "res")
                        if( res.code == "200" ){
                            // this.close();
                            let result = res.result;
                            let jsonsData = {
                                    userId: this.userInfo.userId,
                                    smallAcessToken: this.userInfo.smallAcessToken,
                                    smallUserkey: this.userInfo.smallUserkey,
                                    indentId: result.indentId,
                                    indentKey: result.indentKey,
                                    indentOddnumbers: result.indentoddnumbers
                                }
                            jsonsData = JSON.stringify(jsonsData);
                            let params = {
                                'jsons': jsonsData,
                                type: "2",
                                openId: this.userInfo.openId,
                            }
                            api.queryPay(params)
                                .then( res => {
                                    if( res.code == "200" ){
                                        let dataObj = res.result;
                                        this.pay(dataObj);
                                    }else{
                                        let errStr = res.message;
                                        wx.showToast({
                                            title: errStr,
                                            icon: 'none',
                                            duration: 2000//持续的时间
                                        })
                                    }
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
            }else{
                const url = "../login/main";
                wx.navigateTo({ url });
            }
        },
        pay(obj){
            wx.requestPayment({
                'timeStamp': obj.timestamp,
                'nonceStr': obj.noncestr,
                'package': obj.package,
                'signType': 'MD5',
                'paySign': obj.paySign,
                'success': function (res) {
                    wx.showToast({
                        title: '支付成功',
                        icon: 'success',
                        duration: 2000
                    });
                    const url = "../order/main";
                    wx.switchTab({ url });
                },
                'fail': function (res) {
                    wx.showToast({
                        title: '支付失败',
                        icon: 'none',
                        duration: 2000
                    });
                }
            })
        },
        goHome(){
          const url = '../type/main';
          wx.switchTab({ url });
        },
    },
    onShareAppMessage: function (res) {
        let titleStr = this.dataList.commodity_name;
        let dataStr = JSON.stringify(this.dataList);
        return {
            title: titleStr,
            path: `/pages/goods_detail/main?data=${dataStr}&share=true`
        }
    },
    onShow(){
        // let storageObj =  wx.getStorageSync("loginInfo");
        // this.userInfo = storageObj;
        // this.orderShow = false;
        // this.showFullPage = false;
        // this.orderEnd = false;
        // this.commoDityCount = 1;
        // this.carRecommendBusinessName = '';
        // this.carRecommendUser = "";
    },
    onUnload(){
        if (this.$options.data) {
          Object.assign(this.$data, this.$options.data())
        }
    },
    onLoad(){
        let storageObj =  wx.getStorageSync("loginInfo");
        this.userInfo = storageObj;
        // this.showFullPage = false;
        // this.orderShow = false;
        // this.orderEnd = false;
        // this.commoDityCount = 1;
        // this.carRecommendBusinessName = '';
        // this.carRecommendUser = "";
        let queryObj = this.$root.$mp.query;
        let query = this.$root.$mp.query;
        if( query.share ){
          this.showBack = true;
        }
        let data = this.$root.$mp.query.data;
        data = JSON.parse(data);
        let imgList = JSON.parse(data.scroll_image_url);
        let describe_image_url = JSON.parse(data.describe_image_url);
        this.dataList = data;
        this.scroll_imgList = imgList;
        this.describeImg = describe_image_url;
    }
}
</script>

<style scoped>
.container{
    flex-direction: column;
    height: 100%;
}
.cur{
    overflow: hidden;
}
.container swiper{
    width: 100%;
    height: 375px;
}
swiper-item image{
    width: 100%;
    height: 375px;
}
.goods_header{
    padding: 10px 20px;
    background-color: #fff;
}
.goods_header .goods_title{
    font-size: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.goods_header .goods_attentions{
    font-size: 14px;
    color: #666;
}
.goods_header .goods_price{
    font-size: 18px;
    color: red;
}
.goods_price span{
    color: #666;
}
.pay_way{
    width: 100%;
    background-color: #eee;
    padding: 10px 20px;
    box-sizing: border-box;
    /* align-items: center; */
    font-size: 14px;
    color: #666;
}
.pay_way img{
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin-right: 5px;
}
.goods_info{
    /* margin: 10px 0; */
    /* background-color: #fff; */
    border-top: 1px solid #efefef;
    border-bottom: 1px solid #efefef;
}
.goods_info div{
    display: flex;
    align-items: center;
    padding: 10px;
}
.goods_address{
    border-bottom: 1px solid #ccc;
}
.goods_address span{
    flex: 1;
    font-size: 14px;
}
.goods_info img{
    height: 20px;
    width: 20px;
    margin-right: 8px;
}
.goods_datail{
    border-bottom: 1px solid #efefef;
}
.goods_datail h1{
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    /* padding-left: 10px; */
    padding: 10px;
}
.goods_datail .detial_cont{
    font-size: 14px;
    color: #666;
    padding: 10px;
}
.goods_datail .detial_cont p{
    margin-bottom: 5px;
}
.goods_notice{
    border-bottom: 1px solid #ccc;
}
.goods_notice h1{
    font-size: 16px;
    width: 100%;
    border-bottom: 1px solid #efefef;
    /* padding-left: 10px; */
    padding: 10px;
}
.goods_notice .notice_cont{
    font-size: 14px;
    color: #666;
    padding: 10px;
    margin-bottom: 30px;
}
.goods_notice .notice_cont p{
    margin-bottom: 5px;
}
.describe{
    width: 100%;
    padding-bottom: 30px;
}
.describe image{
    width: 100%;
    /* height: 1322px; */
}
.share_btn{
    width: 26px;
    height: 26px;
    padding: 0;
    background-color:#fff;
}
.share_btn img{
    height: 100%;
    width: 100%;
    vertical-align: top;
}
.share_btn::after{
    border: none;
}
.order{
  width: 100%;
  height: 50px;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  font-size: 32rpx;
  overflow: hidden;

}
.recommend-input input{
    border-bottom: 1px solid #ccc;
    padding-left: 5px;
}
.order-detail{
    border-top: 1px solid #ccc;
}
.order-detail .order-num{
  padding: 20rpx 40rpx;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.order-num .fl{
    width: 80px;
    text-align: left;
}
.num-box{
    display: flex;
    align-items: center;
}
/* .num-input div{
    float: right;
} */
.order-num img{
  display: inline-block;
  width: 24px;
  height: 24px;
}
.order-detail .order-num input{
  width: 64rpx;
  text-align: center;
  display: inline-block;
}
.order .order-btn{
    text-align: center;
    background-color: #119a26;
    color: #fff;
    padding: 20rpx 0;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
}
.show{
  display: block;
}
.hide{
  display: none;
}
.recommend-user{
    display: flex;
    align-items: center;
    padding: 10px 20px;
}
.recommend-business{
    display: flex;
    align-items: center;
    padding: 10px 20px;
}
.recommend-user text{
    width: 80px;
    text-align: left;
}
.recommend-business text{
    width: 80px;
    text-align: left;
}
.recommend-input {
    flex: 1;
    margin-left: 10px;
}
.back-home{
  height: 32px;
  display: flex;
  align-items: center;
  background-color: rgba(0,0,0,0.5);
  border-radius: 0 16px 16px 0;
  width: 100px;
  position: fixed;
  top: 20px;
  left: 0;
  font-size: 16px;
  color: #fff;
  justify-content: center;
}
.back-home img{
  height: 32rpx;
  width: 32rpx;
}
</style>
