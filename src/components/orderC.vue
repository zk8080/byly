<template>
  <div class="page">
    <div class="weui-form-preview">
      <div class="weui-form-preview__hd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">付款金额</div>
          <div class="weui-form-preview__value_in-hd">¥{{orderData.price}}</div>
        </div>
      </div>
      <div class="weui-form-preview__bd">
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">商品</div>
          <div class="weui-form-preview__value">{{orderData.title}}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">数量</div>
          <div class="weui-form-preview__value">{{orderData.orderNum}}</div>
        </div>
        <div class="weui-form-preview__item">
          <div class="weui-form-preview__label">门店</div>
          <div class="weui-form-preview__value">{{orderData.address}}</div>
        </div>
      </div>
      <div class="weui-form-preview__ft">
        <navigator url="" class="weui-form-preview__btn weui-form-preview__btn_primary" hover-class="weui-form-preview__btn_active">查看二维码</navigator>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['orderData']
}
</script>

<style>

</style>


