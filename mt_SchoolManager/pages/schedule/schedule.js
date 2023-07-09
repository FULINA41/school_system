// pages/schedule/schedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< Updated upstream

=======
    currentWeekIndex: 0, // 当前周
    totalWeek: 17, // 周总数
    showSwitchWeek: false, // 显示选择周数弹窗
    weekDayCount: 7,
    startDate: '2023/02/20', // 开学日期
    weekIndexText: ['一', '二', '三', '四', '五', '六', '日'],
    nowMonth: 1, // 当前周的月份
    courseList: [],
    colorList: [
      "#116A7B",
      "#DD58D6",
      "#30A2FF",
      "#0079FF",
      "#F79327",
      "#47A992",
      "#7A3E3E",
      "#FF55BB",
      "#A0D8B3",
      "#539165",
      "#3A98B9",
      "#609966",
    ],
    courseColor: {},
    weekCalendar: [1, 2, 3, 4, 5, 6, 7],
    firstEntry: true,
    weeks: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    isinweek:0
>>>>>>> Stashed changes
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    if(typeof this.getTabBar==='function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:0
      })
    }
<<<<<<< Updated upstream
=======
    if(that.data.weeks.indexOf(that.data.currentWeekIndex)>=0){
      that.setData({
        isinweek:1
      })
      console.log("isinweek",that.data.isinweek)
    }
    that.getWeekDates()
    that.getNowWeek()
    that.getData()
    that.getTodayDate()
>>>>>>> Stashed changes
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

<<<<<<< Updated upstream
=======
  onWeekChanged: function (e) {
    var newlist=[]
    var list=['1','2','3','4','5']
    var that=this
    var weekindex
    console.log("weekIndex is:", e.detail.value)
    this.setData({
      currentWeekIndex: e.detail.value,
    })
    weekindex=that.data.currentWeekIndex+1
    console.log("weekindex is:", weekindex)
    for(let item of that.data.courseList){
      console.log("item:", item)
      if(list.indexOf(weekindex.toString())>=0){
        newlist.push(item)
      }
    }
    console.log("newlist:", newlist)

  },
>>>>>>> Stashed changes
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
<<<<<<< Updated upstream
    if(typeof this.getTabBar==='function' && this.getTabBar()){
=======
    var that=this
    if(that.data.weeks.indexOf(that.data.currentWeekIndex)>=0){
      that.setData({
        isinweek:1
      })
    }
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
>>>>>>> Stashed changes
      this.getTabBar().setData({
        selected:0
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

<<<<<<< Updated upstream
=======
  getDateObject(date = new Date()) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return {
      year,
      month,
      day
    }
  },

  getNowWeek() {
    const nowWeek = getNowWeek(this.data.startDate, this.data.totalWeek)
    console.log("noweek:",nowWeek)
    this.setData({
      currentWeekIndex: nowWeek
    })
    this.getWeekDates()
  },

  getData() {
    const cache = wx.getStorageSync(courseCacheKey)
    const courseColorCache = wx.getStorageSync(courseColorCacheKey)
    if (cache) {
      this.setData({
        courseList: cache,
      })

      if (!courseColorCache) {
        this.buildCourseColor()
      } else {
        this.setData({
          courseColor: courseColorCache
        })
      }
      return
    }
    this.updateFn(true)
  },

  update() {
    this.updateFn()
  },

  updateFn(firstEntry = false) {
    const that = this
    console.log("update")
    getCourseListRequest().then(res => {
      that.setData({
        courseList: res.data
        
      })
      console.log("list:",this.data.courseList)
      that.buildCourseColor()
      if (!firstEntry) {
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        })
      }
      wx.setStorageSync(courseCacheKey, res.data)
    })
  },

  swiperSwitchWeek(e) {
    if (e.detail.source == '') {
      this.setData({
        firstEntry: false
      })
      return
    }
    const index = e.detail.current
    this.switchWeekFn(index + 1)
  },

  buildCourseColor() {
    const courseColor = {}
    let colorIndex = 0
    this.data.courseList.map(item => {
      if (courseColor[item.name] === undefined) {
        courseColor[item.name] = this.data.colorList[colorIndex]
        colorIndex++
      }
    })
    wx.setStorageSync(courseColorCacheKey, courseColor)
    this.setData({
      courseColor
    })
  },

  // 获取今天日期
  getTodayDate() {
    const {
      month: todayMonth,
      day: todayDay
    } = this.getDateObject()
    this.setData({
      todayMonth,
      todayDay
    })
  },
  isCurrentWeekIndexInWeeks: function(weeks, currentWeekIndex) {
    return weeks.includes(currentWeekIndex);
  },

  navCourseDetail(e) {
    const index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: `/pages/course-detail/index?info=${JSON.stringify(this.data.courseList[index])}`,
    })
>>>>>>> Stashed changes
  }
})