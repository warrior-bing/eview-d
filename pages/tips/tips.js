
Page({
  data: {
    flag: true
  },
  onLoad() {},
  onRemoveTips(e){
    this.setData({
      flag: false
    })
  }
});
