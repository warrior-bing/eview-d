/**
 *  主要功能：搜索
 * 
 *  组件参数描述：
 *    name           desc          type       default
 *    value:         输入框值       String     ''
 * 
 *  props参数：
 *    name           desc                type       default
 *    title:         标题                String      ''
 *   
 *  组件方法描述：
 *    showContent: 标题点击
 *   
 */
Component({
  mixins: [],
  data: {
    componentType: 'fuzzy',
    value: '',
    // showList: false,
    // communityData: ''
  },
  props: {
    showMask: false,
    onGoBack: (e) => { },
    onSetValue: (e, item) => { }
  },

  didMount() {
    // dd.createSelectorQuery().select('#input').focus()
  },
  didUpdate() { },
  didUnmount() { },
  methods: {
    // 返回
    goBack(e) {
      this.props.onGoBack(e)
    },
    // input值
    getValue(e) {
      this.setData({
        value: e.detail.value
      })
    },
    // 确认搜索
    doneSearch(e) {
      // this.getDataList(e.detail.value)
      console.log('搜索开始，调用API')
      this.setData({
        showList: true
      })
    },
    // 搜索按钮
    goSearch(e) {
      // this.getDataList(this.data.value)
      console.log('搜索开始，调用API')
      this.setData({
        showList: true
      })
    },
    // 小区
    setValue(e) {
      let item = e.target.dataset.item
      this.props.onSetValue(e, item)
      this.setData({
        value: '',
        communityData: '',
        showList: false
      })
    },
  },
});
