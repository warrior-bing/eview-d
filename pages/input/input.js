Page({
  data: {
    // 基本信息
    cancelBlur: false,
    getvalue: '',
    blur: '',
    focus: '',
    // input 验证规则
    inputValidate: {
      // 下家
      downArrears: {
        reportMoney: {
          reg: '^([+]?\\d{1,9})(\\.\\d{1,5})?$',
          tips: '报备金额为10位数字',
          label: '报备金额',
          required: true,
          parentKey: 'downArrears'
        },
        batchLoanAmount: {
          reg: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
          min: 0,
          max: 1000000,
          tips: '预计批贷金额为10位数字',
          label: '预计批贷金额',
          required: true,
          parentKey: 'downArrears'
        },
        batchLoanRate: {
          reg: '^([+]?\\d{1,3})(\\.\\d{1,5})?$',
          tips: '预计批贷利率为小于1000数字',
          label: '预计批贷利率',
          required: false,
          parentKey: 'downArrears'
        },
        batchLoanTerm: {
          reg: '^([+]?\\d{1,3})$',
          tips: '预计批贷期限为小于1000数字',
          label: '预计批贷期限',
          required: true,
          parentKey: 'downArrears'
        }
      }
    },
    downArrears: {
      reportMoney: 0,
      batchLoanAmount: '0',
      batchLoanRate: 0,
      batchLoanTerm: '0'
    }
  },
  onLoad() {
    let app = getApp()
    new app.Toast
    // setTimeout(() => {
    //   this.setData({
    //     ['downArrears.reportMoney']: "3352352"
    //   })
    // },2500)
  },


  onGetValue(e) {
    let keyArr = e.target.dataset.valueKey
    let value = e.detail.value

    this.setData({
      [keyArr]: value
    })
  },

  inputBlur(e) {
    console.log('father.this', e)
    let keyArr = e.target.dataset.valueKey
    let value = e.detail.finalValue

    // this.setData({
    //   [keyArr]: value
    // })
  },

  inputFocus(e) {
    this.setData({
      cancelBlur: false
    })
  },

  submitInfo() {
    this.setData({
      cancelBlur: true
    })
    let validateData = this.data.inputValidate
    Object.keys(validateData).some(key => {
      let flag = true
      let vObj = validateData[key]
      if (vObj instanceof Array) {
        let vData = this.data[key]
        vData.some((item, index) => {
          Object.keys(vObj[index]).some(itemKey => {
            flag = this.validateSubmit(key + '.' + index + '.' + itemKey, item[itemKey])
            return !flag
          })
          return !flag
        })
      } else {
        Object.keys(vObj).some(subKey => {
          let pKey = vObj[subKey]['parentKey']
          flag = this.validateSubmit(pKey + '.' + subKey, this.data[pKey][subKey])
          return !flag
        })
      }
      return !flag
    })

  },
  validateSubmit(valueKey, value) {
    let $componentThis = this.$getComponentBy((res) => {
      return res.props.valueKey === valueKey
    })[0]
    return $componentThis && $componentThis.validateInputRequired(value) && $componentThis.validateInputReg(value)
  }
});
