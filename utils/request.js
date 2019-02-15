class Request {
  getData({ url,method="GET" }) {
    const promise = new Promise((resolved, rejected) => {
      wx.request({
        url,
        method:method,
        success: res => {
          resolved(res)
        },
        fail: err => {
          rejected(err)
        }
      })
    })
    return promise
  }
} 
export {Request}