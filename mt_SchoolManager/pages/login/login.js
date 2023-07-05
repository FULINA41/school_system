// pages/login/login.js
const app=getApp()
import {
  loginRequest
} from "../../api/main"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stuId: '', //学号
    password: '', //密码
    saveCount: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.initAccount()
  },
  //初始化账号
  initAccount() {
    const accountCache = wx.getStorageSync('account')
    if (accountCache) {
      this.setData({
        ...accountCache
      })
    }
  },
  login() {
    const that = this
    const postData = {
      stuId: that.data.stuId,
      password: that.data.password
    }
    
    wx.showLoading({
      title: '登录中',
    })
    loginRequest(postData).then(res => {

      wx.hideLoading()
      console.log(res)
      if (res.code == -1) {
        wx.showToast({
          title: "密码或用户名错误",
          icon: 'none'
        })
        return
      }
      wx.setStorageSync('token', res.data.cookie)
      if (that.data.saveCount) {
        wx.setStorageSync('account', postData)
      } else {
        wx.removeStorageSync('account')
      }
      wx.showToast({
        title: '登陆成功',
        icon: 'success'
      })
      app.globalData.userInfo.stuId=that.data.stuId
    app.globalData.userInfo.password=that.data.password
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/index/index',
        })
      }, 1500);

    })


  },

  switchStatus() {
    this.setData({
      saveCount: !this.data.saveCount
    })
  },


  //以上motong 完成
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})