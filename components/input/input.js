/**
 *
 *  组件参数描述：
 *    name           desc           type       default
 *    name:          form name属性   String     ''
 *    title:         选项标题         String     ''
 *    required:      是否必填         Boolean    false
 *    disabled:      是否禁用         Boolean    false
 *    placeholder:   占位符           String     ''
 *    value:         初始内容         String     ''
 *    reg:           正则            String     ''
 *    money:         金额            Boolean    false
 *    cutBit:        是否千分位       Boolean    false
 *    decimal:       保留小数位        Number     0
 *    unit:          单位            String     ''
 *    valueKey:      自定义监听字段    String     ''
 *    errorFlag:     错误标识         Boolean    false
 *    errorTips:     自定义错误提示    String     ''
 *    invidateMethod:启用blur检测     String     'blur'  
 *    structures:    label位置       String     'left' 
 *    closeLevel:    是否展示数量级    Boolean     false
 * 
 *  组件方法描述：
 *    onGetValue: 输入回调函数
 *      e: event对象
 *    onInputFocus: 失去焦点回调函数
 *      e: event对象
 *    onInputBlur: 获取焦点回调函数
 *      e: event对象
 *    注: 以上三个回调，输入金额的时候会将格式化数据（{cutBitValue:千分位；decimalValue：小数；upperValue；大写；moneyLevel：数量级}）挂载在e.detail上，需要是直接使用即可
 *  
 */
import * as utils from '../../utils/utils'
Component({
  mixins: [],
  data: {
    componentType: 'input',
    moneyLevel: '',
    componentErrorFlag: false,
    inputvalue: '',
    showinput: false,
    focus: false
  },
  props: {
    name: '',   // form name属性
    title: '',  // label
    required: false, // 是否必填
    disabled: false, // 是否禁用
    placeholder: '', // 默认展示文字
    value: '', // 值
    validate: '', // 正则
    valueKey: '', // 字段标识
    money: false, // 是否是钱
    cutBit: true, // 千分位
    decimal: 2, // 保留小数位
    unit: '', // 单位
    reg: '', // 正则
    errorTips: '',  //自定义错误提示
    invidateMethod: 'blur', //启用blur检测
    structures: 'left',
    closeLevel: false,
    password: false,
    onGetValue: (e) => { }, // 回调
    onInputFocus: (e) => { }, // 回调
    onInputBlur: (e) => { } // 回调
  },
  didMount() {
    this.initInputValue()
  },
  didUpdate(oldProps, oldData) {
    if (oldProps.value !== this.props.value) {
      this.initInputValue('update')
    }
  },
  didUnmount() { },
  methods: {
    initInputValue(type) {
      let { value, money, structures, disabled } = this.props
      // 为了兼容 input disabled 真机修改默认样式无效，disabled 走非input的模板
      if (disabled) {
        if (money) {
          let formatvalue = this.formatValue(null, value)
          this.setData({
            showinput: true, 
            inputvalue: value !== '' ? formatvalue.finalValue : '未填写',
            moneyLevel: formatvalue.moneyLevel !== '' ? (structures == 'left' ? `${formatvalue.moneyLevel} |` : `| ${formatvalue.moneyLevel} `) : ''
          })
        } else {
          this.setData({
            showinput: true,
            inputvalue: value !== '' ? value : '未填写'
          })
        }
      } else {
        if (money && value !== '') {
          let formatvalue = this.formatValue(null, value)
          if (type === 'update') {
            if (!this.data.focus) {
              this.setData({
                showinput: (value + '').length > 0 ? true : false,
                moneyLevel: formatvalue.moneyLevel !== '' ? (structures == 'left' ? `${formatvalue.moneyLevel} |` : `| ${formatvalue.moneyLevel} `) : ''
              })
            }
          } else {
            this.setData({
              showinput: true,
              focus: false,
              moneyLevel: formatvalue.moneyLevel !== '' ? (structures == 'left' ? `${formatvalue.moneyLevel} |` : `| ${formatvalue.moneyLevel} `) : ''
            })
          }
        }
      }

    },
    // 获取input值
    getValue(e) {
      // 金额类型独立出去
      if (this.props.money) {
        let formatvalue = this.formatValue(e)
        Object.assign(e.detail, formatvalue)
        this.setData({
          moneyLevel: e.detail.value && formatvalue.moneyLevel !== '' ? (this.props.structures == 'left' ? `${formatvalue.moneyLevel} |` : `| ${formatvalue.moneyLevel} `) : ''
        })
      }
      this.props.onGetValue(e);
    },

    inputFocus(e) {
      this.setData({
        componentErrorFlag: false,
        focus: true
      })
      if (this.props.money) {
        let formatvalue = this.formatValue(e)
        Object.assign(e.detail, formatvalue)
      }
      this.props.onInputFocus(e);
    },
  // 点击view 模板事件
    showInput() {
      if (this.props.disabled) {
        return
      }
      this.setData({
        showinput: false,
        focus: true
      })
    },

    inputBlur(e) {
      if (this.props.money) {
        let formatvalue = this.formatValue(e)
        Object.assign(e.detail, formatvalue)
        if (e.detail.value != '') {
          this.setData({
            showinput: true,
            focus: false
          })
        }
        if (Number.isNaN(+e.detail.value)) {
          this.setData({
            componentErrorFlag: true,
          })
          this.$page.show('只允许输入数字!')
          return
        }
      } else {
         this.setData({
            focus: false
          })
      }

      // submit的时候取消blur检查
      if (!this.$page.data.cancelBlur && this.props.invidateMethod === 'blur') {
        this.validateInputRequired(e.detail.value)
        this.validateInputReg(e.detail.value)
      }
      this.props.onInputBlur(e);
    },

    // 金额类型拓展数值
    formatValue(e, initValue) {
      let { cutBit, decimal } = this.props
      let value = (e && e.detail ? e.detail.value : initValue + '') || ''
      let _formatMoney = {}
      let finalValue = ''
      value = (value + '').replace(/\s+/g, '').replace(/,/g, '')
      _formatMoney['finalValue'] = value
      if (+decimal > 0) {
        _formatMoney['decimalValue'] = _formatMoney['finalValue'] = finalValue = utils.toDecimal(value, +decimal)
        _formatMoney['upperValue'] = utils.upper(finalValue)
      } else {
        _formatMoney['upperValue'] = utils.upper(value)
      }

      if (cutBit) {
        _formatMoney['cutBitValue'] = utils.cutBit(value, this.$page)
        _formatMoney['finalValue'] = utils.cutBit(finalValue)
      }

      _formatMoney['moneyLevel'] = utils.moneyLevel(value)

      this.setData({
        inputvalue: !this.props.password ? _formatMoney.finalValue : new Array(_formatMoney.finalValue.length).fill('*')
      })
      return _formatMoney
    },

    // 验证输入格式不为空
    validateInputRequired(value, label) {
      let { required, title, disabled } = this.props
      let flag = false
      let checkRequire = String(required) === 'true' ? true : false
      let checkDisable = String(disabled) === 'true' ? true : false
      if (checkRequire && !checkDisable) {
        if ((value + '').trim() === '') {
          this.setData({
            componentErrorFlag: true,
          })
          label !== undefined && label !== "" ? this.$page.show(`${label}不能为空！`) : this.$page.show(`${title}不能为空！`)
          flag = true
        }
      }
      return !flag
    },

    // 验证输入格式
    validateInputReg(value) {
      let { reg, min, max, errorTips, disabled } = this.props
      let checkReg = typeof reg === 'string' ? new RegExp(reg) : reg
      let flag = false

      value = (value + '').replace(/\s+/g, '').replace(/,/g, '')
      if ((value + '') !== '' && !!!disabled) {
        if (!checkReg.test(value) || (max && (Number(value) <= min || Number(value) >= max))) {
          this.setData({
            componentErrorFlag: true,
          })
          this.$page.show({
            location: 'top',
            msg: errorTips
          })
          flag = true
        }
      }
      return !flag
    },
  }
});
