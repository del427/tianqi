// pages/homePage/homePage.js
import {IndexModel} from '../model/indexModel.js'
const indexModel = new IndexModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //位置信息
    basic:{},
    //三天天气
    daily:[],
    //生活指数
    life:[],
    //几点
    hour:'',
    //今天的天气图片
    nowImg:'',
    //明天的天气图片
    tomorrowImg:'',
    //后天的天气图片
    afterImg:'',
    //经度
    longitude:'',
    //纬度
    latitude:'',
    //城市
    city:'',
    //实况信息
    now:{}
  },
  //请求实况天气
  getNowWeather(options){
    
    let location = options.latitude === undefined ? `${options.value}` : `${options.longitude},${options.latitude}`
    const data = indexModel.getWeather(`https://free-api.heweather.com/s6/weather/now?location=${location}&key=666e755c02dc4e2486ca92ab9d3d1f12`).then(res => {
      // console.log(res)
      wx.setStorageSync('basic',res.data.HeWeather6[0].basic)
      wx.setStorageSync('now', res.data.HeWeather6[0].now)
      this.setData({
        basic: res.data.HeWeather6[0].basic,
        now: res.data.HeWeather6[0].now,
        city: res.data.HeWeather6[0].basic.location
      })
    })
  },
  //请求3天天气数据
  getManyDay(options){
    let location = options.latitude === undefined ? `${options.value}` : `${options.longitude},${options.latitude}`
    const threeDay = indexModel.getManyDay(`https://free-api.heweather.com/s6/weather/forecast?location=${location}&key=666e755c02dc4e2486ca92ab9d3d1f12`).then(res => {
      // console.log(res)
      const daily = res.data.HeWeather6[0].daily_forecast
      wx.setStorageSync('daily', daily)
      this.setData({
        daily
      })
    })
  },
  //请求生活指数
  getLife(options){
    let location = options.latitude === undefined ? `${options.value}` : `${options.longitude},${options.latitude}`
    indexModel.getLife(`https://free-api.heweather.com/s6/weather/lifestyle?location=${location}&key=666e755c02dc4e2486ca92ab9d3d1f12`).then(res => {
      // console.log(res)
      const life = res.data.HeWeather6[0].lifestyle
      wx.setStorageSync('life',life)
      this.setData({
        life
      })
    })
  },
  //获取几点
  getHour(){
    let hour = new Date().getHours()
    this.setData({
      hour
    })
  },
  //请求位置
  getLocation() {
    wx.getLocation({
      success: res => {
        const options = { longitude: res.longitude, latitude: res.latitude}
        this.getNowWeather(options)
        this.getManyDay(options)
        this.getLife(options)
      },
      fail: err => {
        wx.showToast({
          title: '位置信息请求失败',
          duration: '1000'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    // this.setData({
    //   longitude:options.longitude,
    //   latitude:options.latitude
    // })
    this.getHour()
    if(options.value){
      const city = this.data.city;
      if(city === options.value){
        return 
      }else if(options.value === '定位'){
        this.getLocation()
      }else{
        this.getNowWeather(options)
        this.getManyDay(options)
        this.getLife(options)
      }
    }else{
      //取缓存
      const basic = wx.getStorageSync('basic')
      const now = wx.getStorageSync('now')
      const daily = wx.getStorageSync('daily')
      const life = wx.getStorageSync('life')
   
      if (basic && now && daily && life && false) {
        console.log(11)
        this.setData({
          basic, now, daily, life
        })
      } else {
        this.getNowWeather(options)
        this.getManyDay(options)
        this.getLife(options)
      }
    }
    
  },
  //搜索城市
  onCity(){
    wx.redirectTo({
      url: '/pages/search/search',
    })
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