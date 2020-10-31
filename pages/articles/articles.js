// pages/articles.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({ //显示消息提示框  此处是提升用户体验的作用
      title: '数据加载中',
      icon: 'loading',
    });
    wx.request({
        url: app.globalData.apiurl + '/article/article_detail/', //请求接口的url
        method: 'POST', //请求方式
        data: {'id': options.id},//请求参数
        header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        complete() {  //请求结束后隐藏 loading 提示框
            wx.hideLoading();
        },
        success: res => {
            this.setData({
              title: res.data['title'],
              content: res.data['content']
            })
        },
        fail: res => {
          console.log(res.errMsg)
        }
    });
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

  }
})