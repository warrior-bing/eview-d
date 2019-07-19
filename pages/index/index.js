Page({
  data: {
    examples: [
      {"name": "areapicker", "path": "areapicker"},
      {"name": "checkbox", "path": "checkbox"},
      {"name": "datepicker", "path": "datepicker"},
      {"name": "dialog", "path": "dialog"},
      {"name": "fold", "path": "fold"},
      {"name": "fuzzy", "path": "fuzzy"},
      {"name": "input", "path": "input"},
      {"name": "picker", "path": "picker"},
      {"name": "popup", "path": "popup"},
      {"name": "tab", "path": "tab"},
      {"name": "textarea", "path": "textarea"},
      {"name": "tips", "path": "tips"},
      {"name": "toast", "path": "toast"},
      {"name": "upload", "path": "upload"},
      {"name": "view", "path": "view"},
      {"name": "validate", "path": "validate"},
      {"name": "pathview", "path": "pathview"}
    ]
  },
  onLoad(query) {
    // 页面加载
    
  },
  lookExample(e) {
    let componentPath = e.target.dataset.path
    dd.navigateTo({
      url: `/pages/${componentPath}/${componentPath}`
    })
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
