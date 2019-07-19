Page({
  data: {
    // 基本信息
    showMask: true
  },
  onLoad () {},
  // 返回
  onGoBack(e) {
    this.setData({
      showMask: false
    })
  },

  // 小区名称
  onSetValue(e, item) {
    this.setData({
      'houseEvaluateInfo.communityName': item.conName,
      'houseEvaluateInfo.cid': item.conCode,
      showMask: false
    })
  },

});
