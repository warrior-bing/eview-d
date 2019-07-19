/**
 *  主要功能：列表模板
 * 
 *  组件参数描述：
 *    name           desc           type       default
 *    showPicker:    是否显示        Boolean     false
 *    areaData:      总数据          Object []   []
 *    province:      省              Object []   []
 *    city:          市              Object []   []
 *    area:          区              Object []   []
 *    valueArr:      选中值          Object []   []
 * componentErrorFlag: 错误提示      Boolean      false
 *  props参数：
 *    value:         值              String     ''
 *    isArea:        是否有区选项     String     1
 *    valueKey:      key(唯一标识)   String     ''
 *    disabled:      是否可用         Boolean     false
 *    allData        后端返回的数据    Object []   []

 * 
 *  组件方法描述：
 *    onGetAreaValue: 确认，取消回调
 *      province: 省选中值
 *      city: 城市选中值
 *      area: 区选中值
 *      valueArr: 选中值
 *      valueKey: key(唯一标识)
 */

Component({
  mixins: [],
  data: {
    componentErrorFlag: false,
    componentType: 'areaPicker',
    showPicker: false,
    areaData: [], // 总数据
    province: [], // 省
    city: [], // 市
    area: [], // 区
    valueArr: [0, 0, 0]
  },
  props: {
    value: '',
    error: false,
    valueKey: '',
    isArea: 1,
    disabled: false,
    allData: [],
    onGetAreaValue: (province, city, area, valueArr, valueKey) => { }
  },
  didMount() {
    this.initData()
    this.initError()
  },
  didUpdate(prevProps,prevData) {
    //如果props传入的allData或者value发生变化，则重新初始化数据
    if ((this.props.allData !== prevProps.allData) || (this.props.value !== prevProps.value)) {
      this.initData()
    }
    if (this.props.error != prevProps.error  || this.props.error) {
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
    initData () {
      if (!Array.isArray(this.props.allData)) return
      //将传入的allData处理成可用的总数据
      let areaData = this.toTree(this.props.allData)
      //初始下标
      let valueArr = [0,0,0]
      //拿到所有省份
      let province = this.getAllProvince(areaData)
      //获取省下标
      this.getIndex(valueArr, province, 0)
      //获取对应的城市
      let city = this.getCityByProvince(areaData, province[valueArr[0]])
      //获取市下标
      this.getIndex(valueArr, city, 1)
      //获取对应的县
      let area = this.getAreaByCity(areaData, province[valueArr[0]], city[valueArr[1]])
      //如果isArea为1则获取县下标

      if (this.props.isArea == 1) {
        this.getIndex(valueArr, area, 2)
      }
      console.log(valueArr)
      this.setData({
        areaData,
        province,
        city,
        area,
        valueArr
      })
    },
    getIndex (valueArr, targetArr, index) {
      //找到省，市，县对应的下标
      if (this.props.value !== '') {
        let arr = this.props.value.split('-')
        valueArr[index] = targetArr.indexOf(arr[index]) == -1 ? 0 : targetArr.indexOf(arr[index])
      }
    },
    toTree(areaList) {
      const areaTreeList = []
      const areaMap = {}

      areaList.map(g => {
        //去除所有名字的首尾空格
        g.name = g.name.trim()
        areaMap[g.id] = g
      })
      areaList.map(g => {
        const parentArea = areaMap[g.pId]
        if (parentArea) {
          parentArea.children = parentArea.children
            ? [...parentArea.children, g]
            : [g]
        } else {
          areaTreeList.push(g)
        }
      })
      return areaTreeList
    },
    /**
     * 获取所有省
     */
    getAllProvince(addressJson) {
      return addressJson.map(item => item.name)
    },

    /**
     * 通过省获取市
     * @param {*} province
     */
    getCityByProvince(addressJson, province) {
      let arr = addressJson.filter(item => item.name === province)[0]
      return (arr && arr.children) ? arr.children.map(item => item.name) : []
    },

    /**
     * 通过市获取区
     * @param {*} city
     */
    getAreaByCity(addressJson, province, city) {
      let arrProvince = addressJson.filter(item => item.name === province)[0]
      let returnArr = []
      if (arrProvince && arrProvince.children) {
        let arrCity = arrProvince.children.filter(itemD => itemD.name === city)[0]
        returnArr = (arrCity && arrCity.children) ? arrCity.children.map(item => item.name) : []
      }
      return returnArr
    },
    //滑动pickerview
    onChange(e) {
      let { areaData, province, city, area } = this.data
      let value = e.detail.value
      //第一列变化就把后两列置为第一项，第二列变化则把第三列置为第一项,否则会显示undefined
      if (value[0] !== this.data.valueArr[0]) {
        value[1] = 0
        value[2] = 0
      } else if (value[1] !== this.data.valueArr[1]) {
        value[2] = 0
      }
      city = this.getCityByProvince(areaData, province[value[0]])
      area = this.getAreaByCity(areaData, province[value[0]], city[value[1]])
      this.setData({
        city,
        area,
        valueArr: value
      })
    },
    // 确认
    onConfirmValue() {
      let { valueArr, province, city, area } = this.data
      let { valueKey } = this.props
      this.setData({
        showPicker: false
      })
      let areaParam = this.props.isArea == 1 ? area[valueArr[2]] : ''
      this.props.onGetAreaValue(province[valueArr[0]], city[valueArr[1]], areaParam, valueArr, valueKey)
    },
    // 取消
    onCancelValue() {
      let {  province, areaData } = this.data
      //初始值
      let valueArr = [0,0,0]
      //获取取消前省的下标
      this.getIndex(valueArr, province, 0)
      //获取取消前的市列
      let city = this.getCityByProvince(areaData, province[valueArr[0]])
      //获取取消前的市下标
      this.getIndex(valueArr, city, 1)
      //获取取消前的县列
      let area = this.getAreaByCity(areaData, province[valueArr[0]], city[valueArr[1]])
      if (this.props.isArea == 1) {
        //获取取消前的县下标
        this.getIndex(valueArr, area, 2)
      }
      this.setData({
        showPicker: false,
        area,
        city,
        valueArr
      })
      this.validateRequired(this.props.value)
      // this.props.onGetAreaValue('', '', '', valueArr, valueKey)
    },
    // 显示弹窗
    showPicker() {
      this.setData({
        showPicker: true,
        componentErrorFlag: false
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
  }
});
