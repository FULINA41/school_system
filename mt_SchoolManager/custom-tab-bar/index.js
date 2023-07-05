const app = getApp()
Component({
    data: {
 
      color: "#afafaf",
      selectedColor: "#49315c",
      list: [
          {
                "pagePath": "/pages/schedule/schedule",
                "text": "查看课表",
                "iconPath": "/asset/xuexijihua-(1).png",
                "selectedIconPath": "/asset/xuexijihua-.png"
            },
            {
              "pagePath": "/pages/index/index",
              "iconPath": "/asset/wode(1).png",
              "selectedIconPath": "/asset/wode.png",
              "text": "个人主页",
              bulge:true,
            },
            {
              "pagePath": "/pages/score/score",
              "iconPath": "/asset/chengjidan-(1).png",
              "selectedIconPath": "/asset/chengjidan-.png",
              "text": "查看成绩"
            }
      ]
    },
    ready: function() {
        this.setData({
          selected: app.globalData.selected
          
        })
      },
    attached() {
    },
    methods: {
        switchTab(e) {
            // console.log(e);
            const data = e.currentTarget.dataset;
            const url = data.path;
            app.globalData.selected = data.index;
            console.log(data.index);
            wx.switchTab({url})
          }
          
        }
  })