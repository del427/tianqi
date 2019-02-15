// pages/search/search.js
import {IndexModel} from '../../pages/model/indexModel.js'
const indexModel = new IndexModel()
let timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:['北京市','广州市','深圳市','上海市','南京市','杭州市','武汉市'],
    placeholder:'请输入城市名,快速查询天气信息',
    //历史记录
    History:[],
    value:'',
    key:true,
    textKey:false,
    basic:[]
  },
  //点击事件
  onTap(e){
    // console.log(e)
   let value = this.pushHis(e);
    wx.redirectTo({
      url: '/pages/homePage/homePage?value=' + value
    })
  },
  //添加历史记录
  pushHis(e){
    const value = e.currentTarget.dataset.item || e.detail.value|| this.data.value ||e._relatedInfo.anchorTargetText;
    const History = this.data.History
    let len = History.length
    let key = false
    if (len) {
      for (var i = 0; i < len; i++) {
        if (History[i] == value || History[i].slice(0, 2) == value ) {
          key = true;
        }
      }
    
      if (!key) {
        History.push(value)
        key = true
        wx.setStorageSync('History', History)
        this.setData({
          History
        })
      }
    } else {
      
      History.push(value)
      wx.setStorageSync('History', History)
      this.setData({
        History
      })
    }
  return value;
  },
  //搜索
  conFirm(e){
    this.pushHis(e)
   
  },
  //input输入事件
  onInput(e){
    let location = e.detail.value
    clearTimeout(timer)
    if(location !== ''){
      this.setData({
        key: false
      })
    }else{
      this.setData({
        key:true
      })
    }
    timer = setTimeout(() => {
      const data = indexModel.getCity(`https://search.heweather.com/find?location=${location}&key=666e755c02dc4e2486ca92ab9d3d1f12&group=cn`).then(res => {
        let data = res.data.HeWeather6[0].status
        if (data !== "ok"){
          this.setData({
            textKey:true
          })
        }else{
          this.setData({
            textKey: false
          })
          this.setData({
            basic: res.data.HeWeather6[0].basic
          })
        }
      })
    },400)
    
    
   
  },
  //input失去焦点事件
  onBlur(e){
    const value = e.detail.value;
    this.setData({
      value,
    })
  },
  //清除历史记录
  onClear() {
    this.setData({
      History:[]
    })
    wx.setStorageSync('History',[])
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const History = wx.getStorageSync('History')
    if(History !== ''){
      this.setData({
        History
      })
    }
    
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