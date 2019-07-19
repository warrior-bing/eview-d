/**
 * 
 *  props参数：
 *    Attribute      Desc                Type   	   Accepted Values     Default
 *    show:          是否显示 Dialog      Boolean     --                  false
 *    closeFlag:     标题是否展示关闭icon  Boolean     --                  true
 *    title:         标题                 String      --                  ''
 *    width:         宽度                 String      --                  '80%'
 *    btnText:       按钮名称             String      --                  '确定'
 *    className:     自定义类名           String       --                 ''
 * 
 *  组件方法描述：
 *    onHandBtn: 按钮回调
 *      e: event对象
 *    onClose:   关闭按钮回调
 *      e: event对象
 */
Component({
  mixins: [],
  data: {
    componentType: 'dialog',
  },
  props: {
    show: false,
    closeFlag: true,
    title: '',
    width: '80%',
    btnText: '确定',
    className: '',
    onHandBtn: () => { },
    onClose: () => { }
  },
  didMount() {
  },
  didUpdate() {
  },
  didUnmount() { },
  methods: {
    onHandBtn(e) {
      this.props.onHandBtn(e)
    },
    onClose(e) {
      this.props.onClose(e)
    }
  },
});