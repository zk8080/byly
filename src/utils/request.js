import Fly from "flyio/dist/npm/wx";

const request = new Fly()

request.config.baseURL='https://www.baoyanmall.cn';

request.interceptors.request.use((request) => {
  // wx.showNavigationBarLoading()
  wx.showLoading({
    title: '加载中',
  })
  request.headers['content-type']="application/x-www-form-urlencoded";
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    // wx.hideNavigationBarLoading()
    wx.hideLoading();
    return promise.resolve(response.data)
    
  },
  (err, promise) => {
    // wx.hideNavigationBarLoading()
    wx.hideLoading();
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
