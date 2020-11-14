// pages/articles.js
const api = require('../../utils/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    article_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '数据加载中',
      icon: 'loading',
    });
    api.getArticleDetail({
      data: {'id': options.id},
      success: res => {
        this.setData({
          article_id: options.id,
          title: res.data['title'],
          content: res.data['content']
        })
      },
      complete() {  //请求结束后隐藏 loading 提示框
        wx.hideLoading();
      },
    });
    api.ArticleRead({
      data: {'openid': app.globalData.userId, 'article_id': options.id}
    })
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
    api.ArticleShare({
      data: {'openid': app.globalData.userId, 'article_id': this.data.article_id}
    })
    return {
      title: '蓝鲸百校'
    }
  }
})