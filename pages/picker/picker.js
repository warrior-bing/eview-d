
Page({
  data: {
    value: '2',
    pickerData: [{
      id: 0,
      name: '选项一',
    },{
      id: 1,
      name: '选项二',
    },{
      id: 2,
      name: '选项三',
    }],
    value3: '123123123'
  },
  onLoad() {

  },

  onGetPickerValue(e, index, item){
    console.log("e:", e)
    console.log("index:", index)
    console.log("item:", item)
    this.setData({
      value: item.id
    })
  },
  setValue () {
    this.setData({
      value3: 0
    })
  }
});
