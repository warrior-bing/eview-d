/**
 *  主要功能：checkbox/radio
 * 
 *  组件参数描述：
 *    name           desc          type       default
 *    dataValue:     组件收集选中    Array      []
 *  props参数：
 *    name           desc          type       default
 *    type:          类型          String     'radio'
 *    radioType:     单选类型       String     'no-cancel'
 *    title:         选项标题       String     ''
 *    required:      是否必填       Boolean    false
 *    error:         错误状态          Boolean    false
 *    disabled:      是否可操作（展示用）Boolean    false
 *    structures:    上下结构）      String     'left'
 *    data:          选项数组数据    Array      []
 *    value:         初始内容       String     ''
 *    valueKey:      自定义监听字段  String     ''
 *  组件方法描述：
 *    onChecked: 回调函数
 *      e: event对象
 */
Component({
  mixins: [],
  data: {
    componentType: 'checkbox',
    componentErrorFlag: false,
    dataValue: [],
    currentLabel: '' 
  },
  props: {
    type: 'radio', // 类型  radio：单选 checkbox：多选 
    radioType: 'no-cancel', // 单选类型 no-cancel：不可取消  cancel：可取消
    title: '', // label
    required: false, // 必填
    disabled: false,
    structures: 'left',
    labelWidth: '', // label 宽
    data: [], // 数据
    value: '', // 当前选中的值
    valueKey: '',
    error: false,
    onChecked: (e, value) => { } // 回调
  },
  didMount() {   
    this.setDisabledData()
    this.initError()
  },
  didUpdate(oldProps, oldData) {
    if (oldProps.value !== this.props.value) {
      this.setDisabledData()
    }
    if (this.props.error !== oldProps.error  || this.props.error) {
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
    checked (e) {
      let value = e.target.dataset.value
      let arr = []
      if (this.props.type === 'radio') {
        if(this.props.radioType === 'cancel'){
          arr = this.data.dataValue
          if(!arr.length){
            arr = [value]
          }else{
            for (let i = 0; i < arr.length; i++) {
              if (arr.indexOf(value) === -1) {
                arr = [value]
              } else {
                arr = []
              }
            }
          }
        }else{
          arr = [value]
        }
      } else {        
        this.data.dataValue.push(value)
        for (let i = 0; i < this.data.dataValue.length; i++) {
          if (arr.indexOf(this.data.dataValue[i]) === -1) {
            arr.push(this.data.dataValue[i])
          } else {
            arr.forEach((item, index) => {
              if (item === this.data.dataValue[i]) {
                arr.splice(index, 1)
              }
            })
          }
        }
      }
      this.props.onChecked(e, arr.join(','))
      this.setData({
        dataValue: arr,
        componentErrorFlag: false,
      })
      this.validateRequired(arr.join(','))
    },
    noChecked() {
      return;
    },
    setDisabledData () {
      const VALUE = this.props.value + ''
      let valueArr = []
      if (this.props.disabled && VALUE !== '') {
        valueArr = VALUE.split(',').map(itemValue => {
          let str
          this.props.data.some(item => {
            if (('' + item.value) === itemValue) {
              str = item.label
              return true
            }
          })
          return str
        })
      } 
      this.setData({
        dataValue: ('' + this.props.value) !== '' ? (this.props.type === 'radio' ? [this.props.value] : (typeof this.props.value === 'string' ? this.props.value.split(',') : this.props.value)) : [],
        currentLabel: valueArr.join(',')
      })
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
  },
});
