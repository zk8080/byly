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
    }
}

export default api;
