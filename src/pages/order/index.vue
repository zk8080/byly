<template>
  <div class="page">

    <div v-if="userInfo" class="page__bd">
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="activeIndex == index? 'weui-navbar__item weui-bar__item_on': 'weui-navbar__item'" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <div class="weui-tab__content"  :hidden="activeIndex != 0">
              <orderCard v-for="( orderItem, orderIndex ) in orderList" :key="orderIndex"  :orderData="orderItem" :aging="aging" :jumpFlag="true"></orderCard>
              <p class="noOrder" v-if="hasOrder">
                暂无订单
              </p>
          </div>
          <div class="weui-tab__content"  :hidden="activeIndex != 1">
              <orderCard v-for="( orderItem, orderIndex ) in orderList" :key="orderIndex"  :orderData="orderItem" :aging="aging" :jumpFlag="false"></orderCard>
              <p class="noOrder" v-if="hasOrder">
                暂无订单
              </p>
          </div>
          <div class="weui-tab__content"  :hidden="activeIndex != 2">
              <orderCard v-for="( orderItem, orderIndex ) in orderList" :key="orderIndex"  :orderData="orderItem" :aging="aging" :jumpFlag="false"></orderCard>
              <p class="noOrder" v-if="hasOrder">
                暂无订单
              </p>
          </div>
        </div>
      </div>
    </div>
    <div class="no_order" v-else>
        <p>您还没有登录，请登录后查看订单</p>
        <a href="/pages/login/main">登录</a>
    </div>
  </div>
</template>

<script>
import orderCard from '@/components/orderCard'
// import orderC from '@/components/orderC'
import api from '../../utils/api'


export default {
  data() {
    return {
      userInfo: {},
      tabs: ["未使用", "已使用", "已过期"],
      activeIndex: 0,
      fontSize: 30,
      orderList: [],
      aging: '',
      hasOrder: false,
    }
  },
  components: {
    orderCard,
  },
  computed: {
    navbarSliderClass() {
      if (this.activeIndex == 0) {
        return 'weui-navbar__slider_0'
      }
      if (this.activeIndex == 1) {
        return 'weui-navbar__slider_1'
      }
      if (this.activeIndex == 2) {
        return 'weui-navbar__slider_2'
      }
    }
  },
  onShareAppMessage: function (res) {
      return {
          title: '宝燕乐园',
          path: `/pages/type/main`
      }
  },
  methods: {
    tabClick(e) {
      // console.log(e);
      this.activeIndex = e.currentTarget.id;
      this.getData();
    },
    async getData(){
      let status = 1;
      if( this.activeIndex == 0 ){
        status = parseInt(this.activeIndex) + 1
      }else if(this.activeIndex == 1){
        status = parseInt(this.activeIndex) + 2;
      }else if(this.activeIndex == 2){
        status = parseInt(this.activeIndex);
      }
      let params = {
        userId: this.userInfo.userId,
        employstatus: status,
      }
      const res = await api.queryIndentStatus(params)
      if( res.code == "200" ){
        this.orderList = res.result.userCardCouponList;
        if( this.orderList.length < 1 ){
            this.hasOrder = true;
        }else{
          this.hasOrder = false;
        }
        this.aging = res.result.aging;
      }else{
        let errStr = res.message;
        wx.showToast({
            title: errStr,
            icon: 'none',
            duration: 2000
        });
      }
    }
  },
  mounted(){

  },
  onHide (){

  },
  onShow(){
    this.activeIndex = 0;
    let storageObj =  wx.getStorageSync("loginInfo");
    this.userInfo = storageObj;
    if( this.userInfo.userId ){
      this.getData();
    }

  },
  onLoad(){
    this.activeIndex = 0;
    let storageObj =  wx.getStorageSync("loginInfo");
    this.userInfo = storageObj;
    if( this.userInfo.userId ){
      this.getData();
    }
  }
}
</script>

<style scoped>
page,
.page,
.page__bd {
  height: 100%;
}
.page__bd {
  padding-bottom: 0;
}
.weui-navbar__item{
  background-color: #fff;
}
.weui-tab__content {
  /* padding-top: 60px; */
  /* text-align: center; */
  padding: 10px;
  height: 100%;
  box-sizing: border-box;
}
.weui-navbar__slider_0 {
  left: 29rpx;
  transform: translateX(0);
}
.weui-navbar__slider_1 {
  left: 29rpx;
  transform: translateX(250rpx);
}
.weui-navbar__slider_2 {
  left:29rpx;
  transform: translateX(500rpx);
}
.noOrder{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no_order{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.no_order a{
  display: block;
  padding: 5px 20px;
  background-color: #119a26;
  color: #fff;
  border-radius: 2px;
  margin-top: 10px;
}
</style>
