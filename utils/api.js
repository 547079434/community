const apiURL = 'https://www.moderndreamer.cn';

const wxRequest = (params, url) => {
  wx.request({
    url,
    method: params.method || 'POST',
    data: params.data || {},
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success(res) {
      if (params.success) {
        params.success(res);
      }
    },
    fail(res) {
      console.log(url, res.errMsg);
      if (params.fail) {
        params.fail(res);
      }
    },
    complete(res) {
      if (params.complete) {
        params.complete(res);
      }
    },
  });
};

const getLabelList = (params) => {
  wxRequest(params, `${apiURL}/article/label_list/`);
};
const getTopicList = (params) => {
  wxRequest(params, `${apiURL}/article/topic_list/`);
};
const getArticleList = (params) => {
  wxRequest(params, `${apiURL}/article/article_list/`);
};
const getArticleDetail = (params) => {
  wxRequest(params, `${apiURL}/article/article_detail/`);
};
const getCreateUser = (params) => {
  wxRequest(params, `${apiURL}/account/create_user/`);
};

module.exports = {
  getLabelList,
  getTopicList,
  getArticleList,
  getArticleDetail,
  getCreateUser
};