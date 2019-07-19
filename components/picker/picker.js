/**
 *  主要功能：滚动选择器（从底部弹起的）
 * 
 *  组件参数描述：
 *    name         desc                                      type       default
 *    value:       表示选择了 data 某项中的ID                 String | number     ''
 *    data:        表示可选择的字符串列表                      Object[]   []
 *    title:       标签名称                                   String     ''
 *    required:    是否必填                                   Boolean    false
 *    disabled:    是否禁用                                   Boolean    false
 *    dataFlag:    是否无数据                                 Boolean    true
 *    placeholder: 占位符                                     String     ''
 *    valueKey:    key(唯一标识)                              String     ''
 *    code:        业务code                                   String     ''
 *    error    验证失败                                  Boolean     false
 *    labelWidth    label的自定义长度                          String     ''
 *     structures    是否上下结构显示                          String     'left'
 *    
 *  组件方法描述：
 *    onGetPickerValue: value 改变时触发  
 *      e: event对象
 *      index: 选中下标
 *      item: 选中值
 */
Component({
  mixins: [],
  data: {
    componentType: 'picker',
    componentErrorFlag: false,
    currentLabel: '',
    //picker的value通过props.value计算而来
    pickerIndex: ''
  },
  props: {
    data: [],
    value: '',
    title: '',
    error: false,
    disabled: false,
    required: false,
    dataFlag: true,
    placeholder: '',
    valueKey: '',
    labelWidth: '',
    code: '',
    error: false,
    structures: "left",
    onGetPickerValue: (e, index, item) => { }
  },
  didMount() {
    this.getCurrentLabelAndIndex()
    this.initError()
  },
  didUpdate(prevProps, prevData) {
    if (this.props.value != prevProps.value) {
      // console.log('update')
      this.getCurrentLabelAndIndex()
    }
    if (this.props.error != prevProps.error || this.props.error) {
      this.initError()
    }
  },
  didUnmount() { },
  methods: {
    initError() {
      this.setData({
        componentErrorFlag: this.props.error
      })
    },
    bindObjPickerChange(e) {
      let index = e.detail.value
      let item = this.props.data[index]
      this.setData({
        pickerIndex: index,
        componentErrorFlag: false
      })
      this.props.onGetPickerValue(e, index, item)
    },
    getCurrentLabelAndIndex() {
      console.log(this.props.value)
      if (this.props.value !== '') {
        // console.log(1)
        this.props.data.some((item, index) => {
          if (item.id == this.props.value) {
            this.setData({
              pickerIndex: index,
              currentLabel: item.name
            })
            return true
          }
        })
      }
    },
    // 验证是否为空
    validateRequired(value, label) {
       let { required, title, disabled, error } = this.props
      if (error) {
        label !== undefined && label !== "" ? this.$page.show(`${label}信息有误！`) : this.$page.show(`${title}信息有误！`)
        return false
      }
      let flag = false
      let checkRequire = String(required) === 'true' ? true : false
      let checkDisable = String(disabled) === 'true' ? true : false
      if (checkRequire && !disabled) {
        if ((value + '').trim() === '') {
          this.setData({
            componentErrorFlag: true,
          })
          label !== undefined && label !== "" ? this.$page.show(`${label}不能为空！`) : this.$page.show(`${title}不能为空！`)
          flag = true
        }
      }
      return !flag
    }
  }
});
