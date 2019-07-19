
Page({
  data: {
    flag: false
  },
  onLoad() {},

  onShowPopup(){
    this.setData({
      flag: true
    })
  },

  onConfirm(){
    this.setData({
      flag: false
    })
  },

  onCancel(){
    this.setData({
      flag: false
    })
  },

  onClose(){
    this.setData({
      flag: false
    })
  }
});
