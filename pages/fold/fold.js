Page({
  data: {
    // 基本信息
    dialogShow: false
  },
  onLoad () {},
  // 关闭回调
  onClose () {
    this.setData({
      dialogShow: false
    })
  },
  onShowBtn () {
    this.setData({
      dialogShow: true
    })
  }

});
