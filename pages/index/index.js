//index.js
//获取应用实例
const api = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    topic_id: 0,
    page: 1, 
    hasNext: true,
    articles: [],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    api.getLabelList({
      data: {},
      success: res => {
        this.setData({
          labels: res.data,
        })
      },
    });
    api.getTopicList({
      data: {},
      success: res => {
        this.setData({
          topics: res.data,
        })
      },
    });
    this.addArticles();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReachBottom: function () {
    this.addArticles();
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  changeTopic: function(e){
    var id = e.currentTarget.id;
    if(id!=this.data.topic_id){
      this.setData({
        topic_id: id,
        articles: [],
        page: 1,
        hasNext: true
      })
      this.addArticles();
    }
    
  },
  addArticles: function(){
    if(this.data.hasNext){
      var data = {page: this.data.page};
      if(this.data.topic_id>0){
        data.topic_id = this.data.topic_id
      }
      wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
        title: '数据加载中',
        icon: 'loading',
      });
      api.getArticleList({
        data: data,
        success: res => {
          if(res.data.length){
            this.setData({
              articles: this.data.articles.concat(res.data),
              page: this.data.page + 1
            })
          }else{
            this.setData({
              hasNext: false
            })
          }
        },
        complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
        }
      });
    }    
  }
})
