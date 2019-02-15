// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //经度
    longitude:0,
    //纬度
    latitude:0,
  },
  //获取用户权限
  getSetting(){
    wx.getSetting({
      success:() => {
        this.getLocation()
      },
      fail:(err) => {
        wx.showToast({
          title: '用户权限获取失败',
        })
      }
    })
  },
  //请求位置
  getLocation() {
    wx.getLocation({
      success: res => {
        const longitude = res.longitude
        const latitude = res.latitude
        wx.redirectTo({
          url: `/pages/homePage/homePage?longitude=${longitude}&latitude=${latitude}`
        })
      },
      fail:err => {
        wx.showToast({
          title: '位置信息请求失败',
          duration:'1000'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
    this.getSetting()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})