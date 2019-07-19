/**
 * 
 *  组件参数描述：
 *    name           desc          type       default
 *    isHide:        是否显示       Boolean    false
 *    type:          类型           String      ''         
 *    content:       内容           String     '加载中...'
 *    location:      toast位置      String   
 *   
 *  组件方法描述：
 *    showLoading: 显示loading组件
 *    hideLoading: 隐藏loading组件
 *    show: 显示toast组件
 * 
 *  使用方法：将以下代码片段放到需要toast的page上
 *          <import src="../../components/toast/toast.axml"/>
 *          <template is="toast" data="{{ ..._toast_ }}"/>
 *          页面onload中使用以下初始化toast
 *          let app = getApp()
 *          new app.Toast
 * 
 *  页面中即可使用this.show('我是toast') 
 *  可以定义toast位置 this.show({
 *                     msg: 'toast',
 *                     location: 'top | bottom | middle'
 *                  })
 * 
 *         
 */
let timer
let _compData = {
  '_toast_.isHide': false,
  '_toast_.content': '',
  '_toast_.type': '',
  '_toast_.location': 'top',
  '_toast_.mask': true
}

let toastPannel = {
  // loading显示的方法
  showLoading: function(data) {
    if (timer) clearTimeout(timer)
    this.setData({
      '_toast_.isHide': true,
      '_toast_.content': typeof data === 'object' ? data.msg : data,
      '_toast_.type': 'loading',
      '_toast_.location': 'middle',
      '_toast_.mask': (typeof data === 'object' && String(data.mask) === 'false') ? false : true
    })
  },
  hideLoading: function(data) {
    this.setData({
      ..._compData
    })
  },
  // toast显示的方法
  show: function(data) {
    let that = this;
    this.setData({
      '_toast_.isHide': true,
      '_toast_.content': typeof data === 'object' ? data.msg : data,
      '_toast_.location': typeof data === 'object' ? data.location : 'top'
    });

    // 加上防抖
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      timer = null
      that.setData({
        ..._compData
      })
    }, 2000)
  }
}

function Toast() {
  
  let app = getApp()
  let pages = getCurrentPages();
  let curPage = pages[pages.length - 1];

  // this.__page = curPage;

  Object.assign(curPage, toastPannel);
  // curPage.toastPannel = this;
  curPage.setData(_compData);
  return this;
}

module.exports = {
  Toast
}
