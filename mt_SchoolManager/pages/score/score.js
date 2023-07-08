// pages/score/score.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< Updated upstream

  },
=======
    score:[
      {
        course:'',
        chengji:'',
        
      }
    ],
    selectedTerm: null, // 初始值为 null
    termList: ['2020-2021第一学期', '2020-2021第二学期', '2021-2022第一学期', '2021-2022第二学期', '2022-2023第一学期', '2022-2023第二学期', '2023-2024第一学期', '2023-2024第二学期'],
      currentchoose:0

  },
  getscore(){
    var that =this
    wx.cloud.database().collection("score"+that.data.currentchoose).where({
      // stuId : app.globalData.userInfo.stuId,
    }).get({
      success:function(res){
        console.log("stuId",app.globalData.userInfo.stuId)
        console.log("score",res)
         that.setData({
           score:res.data[0].score
         })
        
      }
    })
    
  },
>>>>>>> Stashed changes

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(typeof this.getTabBar==='function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:2
      })
    }
  },
<<<<<<< Updated upstream
=======
  onPickerChange: function (event) {
    var that=this
    const index = event.detail.value;
    console.log("携带值改变",event.detail.value)
    that.setData({
      currentchoose:event.detail.value
    })
  console.log("list:",that.data.termList[0])
    const term = that.data.termList[index];
    that.setData({
      selectedTerm: term,
    });
    wx.cloud.database().collection("score"+that.data.currentchoose).where({
      // stuId : app.globalData.userInfo.stuId,
    }).get({
      success:function(res){
        console.log("stuId",app.globalData.userInfo.stuId)
        console.log("score",res)
         that.setData({
           score:res.data[0].score
         })
        
      }
    })
  },
>>>>>>> Stashed changes

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getscore()
    if(typeof this.getTabBar==='function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:2
      })
    }
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