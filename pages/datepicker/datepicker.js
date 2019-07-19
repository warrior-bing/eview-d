Page({
  data: {
    // 基本信息
    reportObj: {
      orderNumber: '', // 订单编号
      borrowerName: '', // 借款人
      applyDays: '', // 申请天数(天)
      applyMoney: '', // 申请金额(元) 千分位
      applyMoneys: '', // 申请金额(元)
      reportMoney: '', // 报备金额(元) 
      planDate: '2019-04-02', // 预计用款日期
      remark: '', // 备注
    }
  },
  onLoad() { },
  // 所有 日期 回调
  onGetDateValue(e, date) {
    let keyArr = e.target.dataset.valueKey.split('.')
    this.setData({
      [keyArr.join('.')]: date
    })
  },
});
