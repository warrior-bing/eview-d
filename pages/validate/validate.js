
Page({
  data: {
    allData: [],
    condition: false,
    validateRules: {
      'address': {
        required: true,
        parentKey: 'formData1'
      },
      'productType': {
        required: true,
        parentKey: 'formData1'
      },
      'planDate': {
        required: true,
        parentKey: 'formData1'
      },
      'batchLoanAmount': {
        reg: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
        min: 0,
        max: 1000000,
        tips: '预计批贷金额为10位数字',
        label: '预计批贷金额',
        required: true,
        parentKey: 'formData1'
      },
      'picker': {
        required: false,
        parentKey: 'formData1'
      },
      'remark': {
        required: true,
        parentKey: 'formData1'
      }
    },
    productTypeData: [
      { label: "普通", value: "DZ", disabled: false },
      { label: "提放", value: "TF", disabled: false },
      { label: "直通宝", value: "ZTB", disabled: false },
      { label: "赎楼", value: "SL", disabled: false }
    ],
    pickerData: [{
      id: 0,
      name: '选项一',
    }, {
      id: 1,
      name: '选项二',
    }, {
      id: 2,
      name: '选项三',
    }],
    formData1: {
      address: "",
      productType: "",
      planDate: "2019-09-09",
      batchLoanAmount: "",
      picker: "1",
      remark: "34234",
      value3: "35242"
    }
  },
  onLoad() {
    let that = this
    let app = getApp()
    new app.Toast
    let res = JSON.parse('[{"id":"110200","isDefaultExpanded":true,"name":"北京郊县","pId":"110000"},{"id":"110000","isDefaultExpanded":true,"name":" 北京市"},{"id":"110100","isDefaultExpanded":true,"name":"北京市区","pId":"110000"},{"id":"110101","isDefaultExpanded":true,"name":"东城区","pId":"110100"},{"id":"110102","isDefaultExpanded":true,"name":"西城区","pId":"110100"},{"id":"110105","isDefaultExpanded":true,"name":"朝阳区","pId":"110100"},{"id":"110106","isDefaultExpanded":true,"name":"丰台区","pId":"110100"},{"id":"110107","isDefaultExpanded":true,"name":"石景山区","pId":"110100"},{"id":"110108","isDefaultExpanded":true,"name":"海淀区","pId":"110100"},{"id":"110109","isDefaultExpanded":true,"name":"门头沟区","pId":"110100"},{"id":"110111","isDefaultExpanded":true,"name":"房山区","pId":"110100"},{"id":"110112","isDefaultExpanded":true,"name":"通州区","pId":"110100"},{"id":"110113","isDefaultExpanded":true,"name":"顺义区","pId":"110100"},{"id":"110114","isDefaultExpanded":true,"name":"昌平区","pId":"110100"},{"id":"110115","isDefaultExpanded":true,"name":"大兴区","pId":"110100"},{"id":"110116","isDefaultExpanded":true,"name":"怀柔区","pId":"110100"},{"id":"110117","isDefaultExpanded":true,"name":"平谷区","pId":"110100"},{"id":"110228","isDefaultExpanded":true,"name":"密云县","pId":"110200"},{"id":"110229","isDefaultExpanded":true,"name":"延庆县","pId":"110200"}]')
    this.setData({
      allData: res || []
    })
  },
  /** 
   * areapicker回调
   */
  onGetAreaValue (province, city, area, valueArr, valueKey) {
    console.log(city,area)
    this.setData({
      [valueKey]: province? (area ? `${province}-${city}-${area}` : `${province}-${city}`) : '',
    })
  },
  /** 
   * checkbox回调
   */
  onCheckedChange(e, value) {
    this.setData({
      'formData1.productType': value
    })
  },
  /** 
   * 日期回调
   */
  onGetDateValue(e, value) {
    this.setData({
      'formData1.planDate': value
    })
  },
  /** 
   * input回调
   */
 onGetValue(e) {
    let keyArr = e.target.dataset.valueKey
    let value = e.detail.value

    this.setData({
      [keyArr]: value
    })
  },
  /** 
   * picker回调
   */
  getTextValue (e) {
    let keyArr = e.target.dataset.valueKey
    let value = e.detail.value

    this.setData({
      [keyArr]: value
    })
  },
  /** 
   * picker回调
   */
  onGetPickerValue(e, value) {
    this.setData({
      'formData1.picker': value
    })
  },

   publicValidate(validateRules, idx) {
    let flag = true
    Object.keys(validateRules).some(key => {
      let vObj = validateRules[key]
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
        let pKey = validateRules[key]['parentKey']
        flag = this.validateSubmit(pKey + '.' + key, this.data[pKey][key], validateRules[key]['label'])
      }
      return !flag
    })
    return flag;
  },
  submitInfo() {
    let flag = true
    let { validateRules } = this.data
  
    if (!this.publicValidate(validateRules)) {
      return
    }

    this.showLoading('提交中...')
    
    setTimeout(() => {
      this.hideLoading()
      this.show('提交成功！')
    },2000)

  },
  validateSubmit(valueKey, value, label) {
    let $componentThis = this.$getComponentBy((res) => {
      return res.props.valueKey === valueKey
    })[0]
    if ($componentThis.data.componentType == 'input') {
      return $componentThis && $componentThis.validateInputRequired(value,label) && $componentThis.validateInputReg(value)
    } else {
      return $componentThis && $componentThis.validateRequired(value,label)
    }
  },
});
