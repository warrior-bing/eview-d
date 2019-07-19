Page({
  data: {
    // 基本信息
    showToast: true
  },
  onLoad () {
    let app = getApp()
    new app.Toast()
    this.showLoading()
  },
  // 关闭回调
  onClose () {
    
  },
  onShowBtn () {
    
  }

});
