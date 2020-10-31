//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
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
    wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '数据加载中',
      icon: 'loading',
    });
    wx.request({
      url: app.globalData.apiurl + '/article/label_list/', //请求接口的url
      method: 'POST', //请求方式
      data: {},//请求参数
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
          this.setData({
            labels: res.data,
          })
      },
      fail: res => {
        console.log(res.errMsg)
      }
    });
    wx.request({
      url: app.globalData.apiurl + '/article/article_list/', //请求接口的url
      method: 'POST', //请求方式
      data: {},//请求参数
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
          this.setData({
            articles: res.data,
          })
      },
      fail: res => {
        console.log(res.errMsg)
      }
    });
    wx.request({
      url: app.globalData.apiurl + '/article/topic_list/', //请求接口的url
      method: 'POST', //请求方式
      data: {},//请求参数
      header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      complete() {  //请求结束后隐藏 loading 提示框
          wx.hideLoading();
      },
      success: res => {
          this.setData({
            topics: res.data,
          })
      },
      fail: res => {
        console.log(res.errMsg)
      }
    });
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
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
