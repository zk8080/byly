<template>
    <div class="container">
        <swiper indicator-dots="true"
            autoplay="true">
            <swiper-item v-for=" (item, index) in imgUrls" :key="index">
                <img :src="item" class="slide-image" width="355" height="150"/>
            </swiper-item>
        </swiper>
        <div class="goods_header">
            <div class="goods_title">
                <p>{{goods_detail.title}}</p>
            </div>
            <div class="goods_attentions">
                <p>{{goods_detail.attentions}}</p>
            </div>
            <div class="goods_price">
                <p>{{goods_detail.price}}</p>
            </div>
        </div>
    </div>  
</template>

<script>
export default {
  data() {
    return {
        imgUrls: [
            'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
            'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
        ],
        goods_detail:{
            "title": "旗舰店",
            "attentions": "每周二16：00闭园消毒；入园中途不可换人",
            "price": '150'
        }
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
.container{
    flex-direction: column;
}
.container swiper{
    width: 100%;
    height: 200px;
}
swiper-item img{
    width: 100%;
}
.goods_header{
    padding: 10px 20px;
}
.goods_header .goods_title{
    font-size: 16px;
}
.goods_header .goods_attentions{
    font-size: 12px;
    color: #666;
}
.goods_header .goods_price{
    font-size: 16px;
    color: red;
}
</style>