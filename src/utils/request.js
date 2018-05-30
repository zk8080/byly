import Fly from "flyio/dist/npm/wx";

const request = new Fly()

request.config.baseURL='https://www.baoyanmall.cn';

request.interceptors.request.use((request) => {
  wx.showNavigationBarLoading()
  request.headers['content-type']="application/x-www-form-urlencoded";
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
    
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
