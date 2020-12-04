// pages/form/form.js
const api = require('../../utils/api.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pics: [],
    files:[],
    topics: [],
    multiIndex: [0, 0, 0],
    index: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.getTopicList({
      data: {},
      success: res => {
        this.setData({
          topics: res.data,
        })
      },
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
  previewImg: function (e) {
    var index = e.target.dataset.index;//当前图片地址
    var imgArr = e.target.dataset.list;//所有要预览的图片的地址集合 数组形式
    console.log(index, imgArr)
    wx.previewImage({
      current: imgArr[index],
      urls: imgArr,
    })
  },
  /**
   * 图片上传
   * 
   */

  //上传图片开始
  chooseImg: function (e) {
    var that = this, pics = this.data.pics, files = this.data.files;
    if (pics.length < 3) {
      wx.chooseImage({
        count: 3, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          for (var i = 0; i < tempFilePaths.length;i++){
            var path = tempFilePaths[i]
            pics.push(path);
            wx.getFileSystemManager().readFile({
              filePath: path,
              encoding: 'base64',
              success:fileStream=>{ 
                var paths = path.split('/');
                var file_data = {'data': fileStream.data, 'name': paths[paths.length-1]}
                files.push(file_data);
              }
            })
          }
          that.setData({
            pics: pics,
            files: files
          })
        },
      });
    } else {
      wx.showToast({
        title: '最多上传3张图片',
        icon: 'none',
        duration: 3000
      });

    }
  },
  // 删除图片
  deleteImg: function (e) {
    var that = this;
    var pics = this.data.pics;
    var files = this.data.files;
    var index = e.currentTarget.dataset.index;
    pics.splice(index, 1);
    files.splice(index, 1);
    this.setData({
      pics: pics,
      files: files
    })
  },
  // 预览图片
  previewImg1: function (e) {
    //获取当前图片的下标
    var index = e.currentTarget.dataset.index;
    //所有图片
    var pics = this.data.pics;
    wx.previewImage({
      //当前显示图片
      current: pics[index],
      //所有图片
      urls: pics
    })
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  formdata: function(obj) {
    let myboundary = 'XXX'
    let result = ''
    for (let name of Object.keys(obj)) {
      let value = obj[name];
      if(name=='img1'||name=='img2'||name=='img3'){
        result += '\r\n--' + myboundary+'\r\n' + 'Content-Disposition: form-data; name="' + name + '"; filename="' + value.name + '"\r\n'+'Content-Type:application/octet-stream' +'\r\n\r\n' + value.data;
      }
      else{
        result += 
        '\r\n--' + myboundary +
        '\r\nContent-Disposition: form-data; name=\"'+ name +'\"'+ 
        '\r\n' +
        '\r\n' + value
      }
    }
    return result + '\r\n--' + myboundary + '--'
  },
  formSubmit(e) {
    var data = e.detail.value;
    for(var i in this.data.files){
      var num = parseInt(i)+1;
      data['img'+num] = this.data.files[i];
    }
    var topic_id = this.data.topics[this.data.index]['id'];
    data['topics'] = topic_id;
    data['openid'] = app.globalData.userId;
    data = this.formdata(data)
    api.ArticleCreate({
      data: data,
      header: {
        'content-type': 'multipart/form-data;boundary=XXX'
      },
      success: res => {
        wx.navigateTo({
          url: '/pages/filter-articles/filter-articles?topic_id='+topic_id,
        })
      }
    })
  },
})