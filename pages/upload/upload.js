
Page({
  data: {
    uploadUrl: 'your upload url'
  },
  onLoad() {
    let app = getApp()
    new app.Toast
  },

  onGetImageUrl(e, filePath){
    console.log('e:', e)
    console.log('e:', e)
  },

  onRemoveImage(e, index, filePath){
    console.log('e:', e)
    console.log('index:', index)
    console.log('filePath:', filePath)
  }
});
