/**
 *  主要功能：选项卡
 * 
 *  组件参数描述：
 *    name          desc                    type       default
 *    itemData:     选项卡数据               Object[]   []
 *    current:      当前选项卡(根据name值)    String     ''
 *    
 *  组件方法描述：
 *    onTabItemTap: 切换选项卡时回调函数
 *    e: event对象
 *    value: 当前选项卡name
 *    index: 当前选项卡下标
 */
Component({
  mixins: [],
  data: {
    componentType: 'tab',
    data: []
  },
  props: {
    itemData: [],
    current: '',
    onTabItemTap: (e, value) => { } // 回调
  },
  didMount() { 
    this.setData({
      data: this.props.itemData
    })
  },
  didUpdate() {
    console.log(this.props.current)
  },
  didUnmount() {},
  methods: {
    tabItemTap (e) {
      let value = e.target.dataset.value
      let index = e.target.dataset.index
      this.props.onTabItemTap(e, value, index)
    }
  },
});
