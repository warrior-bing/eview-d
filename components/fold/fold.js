/**
 * 
 *  组件参数描述：
 *    name           desc          type       default
 *    flag:      fold展开折叠   Boolean    false
 *    isChange:      是否改变状态   Boolean    false
 * 
 *  props参数：
 *    Attribute      Desc          type       Accepted Values   default
 *    collapse:          展开折叠       Boolean    --               false
 *    title:         标题           String     --               ''
 *    subTitle:      副标题         String     --               ''
 *    className:     自定义类名     String     --                ''
 *   
 *  组件方法描述：
 *    showContent: 标题点击
 *   
 */
Component({
  data: {
    componentType: 'fold',
    flag: false,
    isChange: false
  },
  props: {
    collapse: false,
    title: '',
    subTitle: '',
    className: ''
  },
  didMount() {
    this.setData({
      flag: this.props.collapse
    })
  },
  didUpdate() {
    this.setData({
      isChange: true
    })
  },
  didUnmount() { },
  methods: {
    showContent(e) {
      this.setData({
        flag: this.data.isChange ? !this.data.flag : !this.props.collapse
      })
    }
  },
});
