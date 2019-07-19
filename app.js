import { Toast } from './components/toast/toast'
App({
  Toast,
  onLaunch(options) {
    console.log('App Launch', options);
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);

    //todo
    // 测试
    const BAS_URL = 'your loaclhost'

    dd.BAS_URL = BAS_URL
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
});