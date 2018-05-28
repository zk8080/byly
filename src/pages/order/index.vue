<template>
  <div class="page">
    <div class="page__bd">
      <div class="weui-tab">
        <div class="weui-navbar">
          <block v-for="(item,index) in tabs" :key="index">
            <div :id="index" :class="{'weui-bar__item_on':activeIndex == index}" class="weui-navbar__item" @click="tabClick">
              <div class="weui-navbar__title">{{item}}</div>
            </div>
          </block>
          <div class="weui-navbar__slider" :class="navbarSliderClass"></div>
        </div>
        <div class="weui-tab__panel">
          <!-- <div class="weui-tab__content" :hidden="activeIndex != 0">
            <orderCard  :orderData=""></orderCard>
          </div>
          <div class="weui-tab__content" :hidden="activeIndex != 1">待使用</div>
          <div class="weui-tab__content" :hidden="activeIndex != 2">已使用</div> -->
          <div class="weui-tab__content" v-for="(item, index) in orderList" :key="index" :hidden="activeIndex != index">
              <orderC v-for="( orderItem, orderIndex ) in item.orderDetailList" :key="orderIndex"  :orderData="orderItem"></orderC>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import orderCard from '@/components/orderCard'
import orderC from '@/components/orderC'

export default {
  data() {
    return {
      tabs: ["待付款", "待使用", "已使用"],
      activeIndex: 0,
      fontSize: 30,
      orderList: [
          {
            type: '01',
            orderDetailList: [
              {
                orderNo: '1232131242',
                status: '待使用',
                orderNum: '5',
                price: '2134',
                title: '旗舰店',
                address: '上海市浦东新区浦东新区浦东新区浦东新区浦东新区',
              }
            ]
          },
          {
            type: '02',
            orderDetailList: [
              {
                orderNo: '1232131242',
                status: '待使用',
                orderNum: '5',
                price: '2134',
                title: '旗舰店',
                address: '上海市浦东新区浦东新区浦东新区浦东新区浦东新区',
              }
            ]
          },
          {
            type: '03',
            orderDetailList: [
              {
                orderNo: '1232131242',
                status: '待使用',
                orderNum: '5',
                price: '2134',
                title: '旗舰店',
                address: '上海市浦东新区浦东新区浦东新区浦东新区浦东新区',
              }
            ]
          },
      ]
    }
  },
  components: {
    orderC,
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
  methods: {
    tabClick(e) {
      console.log(e);
      this.activeIndex = e.currentTarget.id;
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
.weui-tab__content {
  /* padding-top: 60px; */
  /* text-align: center; */
  padding: 10px;
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
</style>