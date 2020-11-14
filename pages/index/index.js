//index.js
//获取应用实例
const api = require('../../utils/api.js');
const app = getApp()

Page({
  data: {
    topic_id: 0,
    page: 1, 
    hasNext: true,
    search: '',
    articles: []
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
    // console.log(app.globalData.userInfo)
    // if (!app.globalData.userInfo) {
    //   app.setUserInfo();
    // }
  },
  onReachBottom: function () {
    this.addArticles();
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
  },
  bindKeyInput: function (e) {
    this.setData({
      search: e.detail.value
    })
  },
  searchArticle: function(){
    if(this.data.search.length > 0){
      wx.navigateTo({
        url: '/pages/filter-articles/filter-articles?search=' + this.data.search
      })
    }
  }
})
