
Page({
  data: {
    itemData: [{
      label: "Tab1",
      name: "tab1"
    }, {
      label: "Tab2",
      name: "tab2"
    }],
    current: 'tab1', //选中tab name
  },
  onLoad() {},

  onTabItemTap(e, value, index) {
    console.log("e:", e)
    console.log("value:", value)
    console.log("index:", index)
    this.setData({
      current: value
    })
  },
});
