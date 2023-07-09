// pages/Questions/questions.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qaList: [
      {
        question: '如何注册教务系统账号？',
        answer: '请联系学校教务部门进行注册。'
      },
      {
        question: '如何重置教务系统密码？',
        answer: '请联系学校教务部门进行密码重置。'
      },
      {
        question: '如何查询成绩？',
        answer: '请登录教务系统，进入成绩查询页面查询。'
      },
      {
        question: '如何查看课程表？',
        answer: '请登录教务系统，进入课程表页面进行查看。'
      },
      {
        question: '如何申请毕业？',
        answer: '登录教务系统，进入毕业申请页面申请。'
      },
      {
        question: '如何查询学分？',
        answer: '请登录教务系统，进入学分查询页面进行查询。'
      }
      // 其他常见问题和回答
    ],
    help:0,
    nohelp:0,
    
  },
  onHelpful: function () {
    var that=this
    // TODO: 用户点击“有帮助”按钮时的处理逻辑
    wx.cloud.database().collection("feedback").where({
      ID:"1"
    }).get({
      success(res){
        console.log("res",res)
        that.setData({
          help:res.data[0].help

        })
      }
    })
    that.data.help++
    wx.cloud.database().collection("feedback").where({
      _id:"8876382664aa33d30002ff73615fcfde"
    }).update({
        data:{
          help:that.data.help
        }
    })

  },

  onUnhelpful: function () {
    // TODO: 用户点击“没帮助”按钮时的处理逻辑
    var that=this
    // TODO: 用户点击“有帮助”按钮时的处理逻辑
    wx.cloud.database().collection("feedback").where({
      ID:"1"
    }).get({
      success(res){
        console.log("res",res)
        that.setData({
          nohelp:res.data[0].nohelp

        })
      }
    })
    that.data.nohelp++
    wx.cloud.database().collection("feedback").where({
      _id:"8876382664aa33d30002ff73615fcfde"
    }).update({
        data:{
          nohelp:that.data.nohelp
        }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

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