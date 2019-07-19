Page({
  data: {
    // 基本信息
    apply: {
      mortgageSituation: '0', // 抵押情况
      productType: 'DZ,TF' // 产品类型
    },
    mortgageSituationData: [
      {label: "无", value: "0", disabled: false},
      {label: "一抵", value: "1", disabled: true},
      {label: "二抵", value: "2", disabled: false}
    ],
    productTypeData: [
      {label: "普通哈在", value: "DZ", disabled: false},
      {label: "提放浊夺一", value: "TF", disabled: false},
      {label: "直通宝要", value: "ZTB", disabled: false},
      {label: "赎楼", value: "SL", disabled: false},
      {label: "银行", value: "YH", disabled: false},
      {label: "个人", value: "GR", disabled: false}
    ]
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        'apply.mortgageSituation': '2'
      })
    },5000)
  },
  // 获取子组件返回值
  onCheckedChange(e, value) {
    let keyArr = e.target.dataset.valueKey.split('.')
    this.setData({
      [e.target.dataset.valueKey]: value
    })
    console.log("keyArr", keyArr)
    console.log("value", value)
  }
});
