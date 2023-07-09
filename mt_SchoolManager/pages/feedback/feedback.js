// pages/feedback/feedback.js
Page({

  data: {
    type: 1,
    content: '',
    images: []
  },

  //data
  onTypeChange: function (e) {
    this.setData({
      type: parseInt(e.detail.value)
    })
  },

  onContentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  onChooseImage: function () {
    var that = this
    wx.chooseMedia({
      count: 9, // 最多可以选择的文件个数
      mediaType: ['image'], // 文件类型
      sizeType: ['original'], // 是否压缩所选文件
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        console.log(res);
        that.setData({
          images: res.tempFiles
        })
        console.log(that.data.imgList);
      },
      fail: function (res) {
        wx.showToast({
          title: '选择图片失败',
          icon: 'none',
          duration: 2000
        })
      }
    })
  },
  // onPreviewImage: function (e) {
  //   wx.previewImage({
  //     urls: this.data.images,
  //     current: e.currentTarget.dataset.url
  //   })
  // },
  onSubmit: function () {
    var that=this
    if(that.data.images==""){
      wx.showToast({
        title: '请上传图片',
        icon: 'error'
      })
      
    }
    else{

      wx.cloud.database().collection("suggestion").add({
      
        data:{
          type:that.data.type,
          images:that.data.images[0].tempFilePath,
          content:that.data.content
        }

    })
    // TODO: 调用数据库交互函数，将数据存储到数据库中
    console.log('type:', this.data.type)
    console.log('content:', this.data.content)
    console.log('images:', this.data.images)
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({
      type: 1,
      content: '',
      images: []
    })
    wx.redirectTo({
      url: '../index/index',
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {},
    })
    }
    

    
  },


  onLoad(options) {

  }
})