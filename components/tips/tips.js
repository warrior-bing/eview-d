/**
 *  主要功能：提示条
 * 
 *  组件参数描述：
 *    name          desc                type       default
 *    text:         显示内容             String     ''
 *    removeFlag:   是否显示删除按钮      Boolean    false
 *    
 *  组件方法描述：
 *    onRemoveTips: 删除按钮回调函数
 *    e: event对象
 */
Component({
  mixins: [],
  data: {
    componentType: 'tips',
  },
  props: {
    text: '',
    removeFlag: false,
    onRemoveTips: (e) => { }
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    removeTips(e) {
      this.props.onRemoveTips(e)
    }
  },
});
