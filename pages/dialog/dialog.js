Page({
  data: {
    // 基本信息
    dialogShow1: false,
    dialogShow2: false
  },
  onLoad () {},
  // 关闭回调
  onClose () {
    this.setData({
      dialogShow1: false,
      dialogShow2: false
    })
  },
  onShowBtn () {
    this.setData({
      dialogShow1: true,
      dialogShow2: true
    })
  }

});
