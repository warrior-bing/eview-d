/**
 * 
 *  组件参数描述：
 *    Attribute      Desc                         Type      Accepted Values    Default
 *    name:          组件名字，用于表单提交获取数据  String    --                 ''
 *    title:         标签名称                      String    --                 ''
 *    required:      是否必填                      Boolean   --                 false
 *    disabled:      是否禁用                      Boolean   --                 false
 *    placeholder:   占位符                        String    --                 ''
 *    className:     自定义类名                    String    --                 ''
 *    value:         初始内容                      String    --                 ''
 *    maxlength:     最大长度(为-1时不限制最大长度)  Number    --                 140
 *    autoHeight     自动高度                      Boolean   --                 true
 *    error:         错误标识                      Boolean   --                 false
 *    busData:       业务数据                      Objectg   --                 {}
 *    valueKey:      key(唯一标识)                 String    --                 ''
 *    
 *  组件方法描述：
 *    onGetTextareaValue: 键盘输入时触发
 *      e: event对象
 */
Component({
  data: {
    componentType: 'textarea',
    componentErrorFlag: false
  },
  props: {
    name: '',   
    title: '',  
    required: false, 
    disabled: false, 
    placeholder: '', 
    className: '',
    value: '', 
    maxlength: 140,
    autoHeight: true,
    error: false,
    busData: {},
    valueKey: '', 
    onInput: (e) => { },
    onFocus: (e) => { },
    onBlur: (e) => { },
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    onInput(e) {
      this.props.onInput(e);
    },
    onFocus(e) {
      this.setData({
        componentErrorFlag: false
      })
      this.props.onFocus(e);
    },
    onBlur(e) {
      this.validateRequired(e.detail.value)
      this.props.onBlur(e);
    },
    // 验证是否为空
    validateRequired(value,label) {
      let { required, title, disabled } = this.props
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
