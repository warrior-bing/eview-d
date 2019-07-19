
Page({
  data: {
    busData: {
      a: 1,
      b: 2
    }
  },
  onLoad() {},

  onInput(e){
    console.log('value:', e.detail.value)

    console.log('subData a:', e.target.dataset.busData.a)
    console.log('subData b:', e.target.dataset.busData.b)
  },
  onBlur(e){
    console.log('value:', e.detail.value)
  },
  onFocus(e){
    console.log('value:', e.detail.value)
  }
});
