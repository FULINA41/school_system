// index.js
// 获取应用实例
const app = getApp()
var count=0
Page({
  data: {
    motto: 'Hello World',
    userInfo: {
      stuId:'',
      nickname:'',
      Img:'',
      grade:'',
      major:'',
      class:'',
      card:'',
      wifi:'',
      
    },
    show:false,
    show2:false,
    isedit:0,
    newNickname:"",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  close(){
    this.setData({
      show:false
    })
  },
  show(){
    this.setData({
      show:true
    })
  },
  close2(){
    this.setData({
      show2:false
    })
  },
  show2(){
    this.setData({
      show2:true
    })
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    var that =this
    if(typeof this.getTabBar==='function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:1
      })
    }
  

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  changename:function (e) {
    var that=this
    console.log(e)
    console.log('xinNAME',e.detail.value.trim())
    that.setData({
        newNickname:e.detail.value.trim()
    })
},
save(){
  var that=this
  wx.showModal({
    title: '',
    content: '确认更改昵称？',
    complete: (res) => {
      if (res.cancel) {
        
      }        
      if (res.confirm) {
        wx.cloud.database().collection('user_info').where({
          stuId : app.globalData.userInfo.stuId
        }).update({
          data:{
            nickname:that.data.newNickname
          }

        })
        wx.showToast({
          title: '更新成功！',
          icon:'none',
          duration:1000
        }),

        that.setData({
          isedit:0,
      })

      that.getuserinfo()
      }
    }
  })

  

},
  onShow(){
    var that=this
    wx.getStorage({
      key:'account',
      success:function(res){
        console.log(res.data.stuId)
        if(res.data.stuId!=null){
          app.globalData.userInfo.stuId=res.data.stuId
         app.globalData.userInfo.password=res.password
         console.log(app.globalData.userInfo.stuId)
          that.setData({
            hasUserInfo:true
          })
          console.log("hasuserinfo",that.data.hasUserInfo)
          
        
          wx.cloud.database().collection('user_info').where({
            stuId:"20074115"//app.globalData.userInfo.stuId
          }).get().then(res=>{
           
              console.log("userInfo",res.data)
              that.setData({
                userInfo:res.data[0]
              })  
            })
        }
      },
      fail:function(res){
          wx.showModal({
            title: '提示',
            content: '您还未登录，是否登录？',
            success:function(res){
                if(res.confirm){
                   console.log('弹框后点确认')
                   wx.reLaunch({
                     url: '/pages/login/login',
                   })
                }else{
                   console.log('弹框后点取消')
                }
            }
         })
        
      }
    })
    console.log("hasUserInfo",that.data.hasUserInfo)
    
    if(typeof this.getTabBar==='function' && this.getTabBar()){
      this.getTabBar().setData({
        selected:1
      })
    }
    
    
  },
  getuserinfo(){
    var that=this
    wx.cloud.database().collection('user_info').where({
      stuId:"20074115"//app.globalData.userInfo.stuId
    }).get().then(res=>{
     
        console.log("userInfo",res.data)
        that.setData({
          userInfo:res.data[0]
        })  
      })
  },
  changeUserAvatar() {
    let a = this;
    wx.showActionSheet({
        itemList: [ "从相册中选择", "拍照" ],
        itemColor: "#694c81",
        success: function(e) {
        //album:相册   //camera拍照
            e.cancel || (0 == e.tapIndex ? a.chooseWxImageShop("album") : 1 == e.tapIndex && a.chooseWxImageShop("camera"));
        }
    });
  },
  //a：选择的类型  //album:相册   //camera拍照
  chooseWxImageShop: function(a) {
  var e = this;
  wx.chooseMedia({
      mediaType : ["image"],
      sizeType: [ "original", "compressed" ],
      sourceType: [ a ],//类型
      count:1,
      success: function(a) {
          if(a.tempFiles[0].size> 2097152){
              wx.showModal({
                  title: "提示",
                  content: "选择的图片过大，请上传不超过2M的图片",
                  showCancel: !1,
                  success: function(a) {
                      a.confirm;
                  }
              })
          }else{
              //把图片上传到服务器
              e.upload_file(a.tempFiles[0].tempFilePath)
          }
      }
  });
  },
    upload_file: function(e) {
      console.log('zaizhe',e);
      var that = this
      console.log('IDIDI',app.globalData.userInfo.stuId)
      wx.showLoading({
          title: "上传中"
      });
      console.log('IDIDI',app.globalData.userInfo.stuId)
      wx.cloud.uploadFile({
          filePath: e,//图片路径
          cloudPath: app.globalData.userInfo.stuId +count+ ".png",
          success(res) {
            console.log('成功')
              count += 1
              console.log(res.fileID)
              that.updateAvatar(res.fileID)
              wx.hideLoading();
              wx.showToast({
                  title: "上传成功",
                  icon: "success",
                  duration: 1000
              });
          },
          fail: function(a) {
              wx.hideLoading();
              wx.showToast({
                  title: "上传失败",
                  icon: "none",
                  duration: 3000
              });
          }
      });
      
    },
    updateAvatar(url) {
      var that = this;
      console.log('url',url)
      wx.cloud.database().collection('user_info').where({
        stuId : app.globalData.userInfo.stuId,
      }).update({
        data : {
        Img : url
        }
      })
      that.getuserinfo()

    },
    editname:function (e){
      var that=this
      wx.showModal({
        title: '',
        content: '是否要更改昵称？',
        complete: (res) => {
          if (res.cancel) {
            
          }        
          if (res.confirm) {
              that.setData({
                  isedit:1,
              })
          }
        }
      })
     // console.log(that.data.uname)
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          // userInfo: res.userInfo,
          
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      // userInfo: e.detail.userInfo,
      
    })
  }
})
