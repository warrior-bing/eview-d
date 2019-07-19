/**
 *  主要功能：弹出窗（从底部弹起的）
 * 
 *  组件参数描述：
 *    name         desc             type       default
 *    closeFlag:   是否显示关闭按钮   Boolean    false
 *    flag:        是否显示          Boolean    false
 *    title:       窗口标题          String     ''
 *    height:      窗口高度          String     ''
 *    
 *  组件方法描述：
 *    onConfirm: 确定按钮回调函数
 *      e: event对象
 *    onCancel:  取消按钮回调函数
 *      e: event对象
 *    onClose:   关闭按钮回调函数
 *      e: event对象
 */
Component({
  mixins: [],
  data: {
    componentType: 'popup',
  },
  props: {
    closeFlag: false,
    flag: false,
    title: '',
    height: '',
    onConfirm: (e) => { },
    onCancel: (e) => { },
    onClose: (e) => { }
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    onConfirm(e) {
      console.log('确认')
      this.props.onConfirm(e)
    },
    onCancel(e) {
      console.log('取消')
      this.props.onCancel(e)
    },
    onClose(e) {
      console.log('关闭')
      this.props.onClose(e)
    }
  },
});
