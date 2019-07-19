/**
 *  主要功能：日期选项器
 * 
 *  组件参数描述：
 *    name           desc           type       default
 *    title:         标题           String     ''
 *    value:         初始内容       String     ''
 *    required:      是否必填       Boolean    false
 *    disabled:      是否可用       Boolean    false
 *    placeholder:   占位符         String     ''
 *    structures:    上下布局试      String     'left' 左右  （‘upper’ 上下）
 *    currentDate:   当前日期       String     ''
 *    right:         保留样式字段    Boolean    false
 *    valueKey:      key(唯一标识)  String     ''
 *  组件方法描述：
 *    onGetDateValue: 回调函数
 *      e: event对象
 *      date: 日期对象
 */
Component({
  mixins: [],
  data: {
    componentType: 'datePicker',
    componentErrorFlag: false
  },
  props: {
    title: '',
    value: '',
    error: false,
    required: false,
    disabled: false,
    structures: 'left',
    labelWidth: '',
    valueKey: '',
    placeholder: '',
    currentDate: '',
    onGetDateValue: (e, date) => { }
  },
  didMount() { 
    this.initError()
  },
  didUpdate(oldProps, oldData) { 
    if (oldProps.error !== this.props.error || this.props.error) {
      this.initError()
    }
  },
  didUnmount() { },
  methods: {
    initError () {
      this.setData({
        componentErrorFlag: this.props.error
      })
    },
    onDateChange(e) {
      this.setData({
        componentErrorFlag: false
      })
      dd.datePicker({
        format: 'yyyy-MM-dd',
        currentDate: this.props.currentDate,
        success: (res) => {
          if (res.date) {
            this.props.onGetDateValue(e, res.date)
          } else {
            this.props.onGetDateValue(e, '')
          }
        },
      });
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
            componentErrorFlag: true
          })
          label !== undefined && label !== "" ? this.$page.show(`${label}不能为空！`) : this.$page.show(`${title}不能为空！`)
          flag = true
        }
      }
      return !flag
    }
  }
});
