import requert from './request'
import { resolve } from 'uri-js';
import qs from 'qs';
const api = {
    // 店铺列表接口
    queryNewBusinessComPany: ( data ) => {
        return new Promise( resolve => {
            requert.post( "/CommoDity/queryNewBusinessComPany", data )
                .then( res => {
                    resolve(res)
                } )
                .catch( err => {
                    console.log(err)
                })
        })
    },

    //商品列表接口
    queryMaxTypeCommoDity: (req) => {
        req = qs.stringify(req);
        return new Promise( resolve => {
            requert.post( "/CommoDity/queryMaxTypeCommoDity", req )
                .then( res => {
                    resolve(res)
                } )
                .catch( err => {
                    console.log(err)
                })
        })
    },

    //登录接口
    queryLogin: (req) => {
        req = qs.stringify(req);
        return new Promise( resolve => {
            requert.post( "/CoreUser/wxUserLogin", req )
                .then( res => {
                    resolve(res)
                } )
                .catch( err => {
                    console.log(err)
                })
        })
    },

    //获取验证码
    querySendCode: (req) => {
        req = qs.stringify(req);
        return new Promise( resolve => {
            requert.post( "/Code/newSendCode", req )
                .then( res => {
                    resolve(res)
                } )
                .catch( err => {
                    console.log(err)
                })
        })
    },

    //注册接口
    queryRegister: (req) => {
        req = qs.stringify(req);
        return new Promise( resolve => {
            requert.post( "/CoreUser/wxUserRegister", req )
                .then( res => {
                    resolve(res)
                } )
                .catch( err => {
                    console.log(err)
                })
        })
    },

    //卡券购买接口
    queryCarCouponIndentDispose: (req) => {
        req = qs.stringify(req);
        return new Promise( resolve => {
            requert.post( "/ident/wxCarCouponIndentDispose", req )
                .then( res => {
                    resolve(res)
                } )
                .catch( err => {
                    console.log(err)
                })
        })
    },

    //微信支付接口
    queryPay: (req) => {
        req = qs.stringify(req);
        return new Promise( resolve => {
            requert.post( "/pay/paySign", req )
                .then( res => {
                    resolve(res)
                } )
                .catch( err => {
                    console.log(err)
                })
        })
    },

    //卡券二维码接口
    queryDynamicCode: (req) => {
        req = qs.stringify(req);
        return new Promise( resolve => {
            requert.post( "/Code/queryDynamicCode", req )
                .then( res => {
                    resolve(res)
                } )
                .catch( err => {
                    console.log(err)
                })
        })
    },
}

export default api;
