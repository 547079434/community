// pages/filter-articles/filter-articles.js
const api = require('../../utils/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1, 
    hasNext: true,
    articles: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      param: options
    })
    this.addArticles(this.data.param);
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
    this.addArticles(this.data.param);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addArticles: function(data){
    if(this.data.hasNext){
      data.page = this.data.page;
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