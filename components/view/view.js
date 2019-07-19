/**
 * 
 *  组件参数描述：
 *    Attribute      Desc          Type       Accepted Values   Default
 *    title:         标签名称       String     --                ''
 *    required:      是否必填       Boolean    --                false
 *    disabled:      是否禁用       Boolean    --                false
 *    placeholder:   占位符         String     --                ''
 *    value:         初始内容       String     --                ''
 *    color:         标签颜色       String     --                '#909399'
 *    unit:          单位           String     --                ''
 *    structures     label位置      String     upper/left        'left'
 *    
 *  组件方法描述：
 *    onShowValue: 点击回调函数
 *      e: event对象
 */
Component({
  mixins: [],
  data: {
    componentType: 'view',
    componentErrorFlag: false
  },
  props: {
    title: '',  
    required: false, 
    disabled: false,
    placeholder: '', 
    value: '',
    color: '#909399',
    unit: '',
    structures: '',
    onShowValue: (e) => { }
  },
  didMount() { },
  didUpdate(prevProps,prevData) { 
    if (this.props.value !== prevProps.value) {
      this.setData({
        componentErrorFlag: false
      })
    }
  },
  didUnmount() { },
  methods: {
    showValue(e) {
      if (this.props.disabled) return
      this.props.onShowValue(e)
    },
     // 验证是否为空
     validateRequired(value) {
      let { required, title, disabled } = this.props
      let flag = false
      let checkRequire = String(required) === 'true' ? true : false
      let checkDisable = String(disabled) === 'true' ? true : false
      if (checkRequire && !disabled) {
        if ((value + '').trim() === '') {
          this.setData({
            componentErrorFlag: true,
          })
          this.$page.show( `${title}不能为空！`)
          flag = true
        }
      }
      return !flag
    }
  },
});
