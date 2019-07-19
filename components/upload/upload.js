/**
 * 
 *  组件参数描述：
 *    name          desc                                             type       default
 *    uploadUrl:    上传api路径                                       String     ''
 *    title:        标签名称                                          String     ''
 *    required:     是否必填                                          Boolean    false
 *    data:         文件列表                                          Object[]   []
 *    uploadInfo:   上传信息(accessKey等)                             Object     {}
 *    max:          最多可以选择的图片数                                Number     20
 *    disabled:     是否禁用                                          Boolean    false
 *    hide:         是否隐藏                                          Boolean    false
 *    detail:       是否数据字段为thumbUrl(默认src)                     Boolean    false
 *    loading:      是否显示loading                                   Boolean    false
 *    border:       是否边框显示                                       Boolean    false
 *    type:         选择上传类型（camera: 相机 album：相册，默认都有）     String     ''
 *    valueKey:     key(唯一标识)                                     String     ''
 *    
 *  组件方法描述：
 *    onGetImageUrl: 上传成功后，获取图片路径
 *      e: event对象
 *      filePath: 上传的文件路径
 *    onRemoveImage: 移除图片后回调函数
 *      e: event对象
 *      index: 移除图片的索引
 *      filePath: 删除的文件路径
 *      
 */
Component({
  mixins: [],
  data: {
    componentErrorFlag: false,
    componentType: 'upload',
    flag: true,
    default: [],
    imgList: [],
    num: 0,
    clickFlag: true
  },
  props: {
    uploadUrl: '',
    title: '',
    required: false,
    data: [],
    uploadInfo: {},
    max: 20,
    valueKey: '',
    disabled: false,
    hide: false,
    detail: '',
    loading: false,
    border: false, // 边框显示
    type: '', // （默认两者都显示） camera: 相机 album：相册
    onGetImageUrl: (e, filePath) => { },
    onRemoveImage: (e, index, filePath) => { }
  },
  didMount() { },
  didUpdate() { },
  didUnmount() { },
  methods: {
    imageLoad(e, data) {
      console.log('加载成功')
      this.setData({
        flag: true,
        imgList: this.props.data,
        num: this.props.max - this.props.data.length
      })
    },
    imageError: function (e) {
      console.log('加载失败')
      this.setData({
        flag: false,
        imgList: this.props.data,
        num: this.props.max - this.props.data.length
      })
    },
    previewImage(e) {
      let that = this
      let arr = []
      this.props.data.forEach((item, index) => {
        arr.push(item.accessUrl || item.originUrl)
      })
      let index = e.target.dataset.index
      dd.previewImage({
        current: index,
        urls: arr,
        fail: (res) => {
          // dd.showToast({
          //   content: '加载图片失败'
          // })
          that.$page.show('加载图片失败')
        },
        complete: (res) => {
        }
      })
    },
    uploadimg(data) {
      let that = this
      var i, success, fail;
      i = data.i ? data.i : 0, // 当前上传的哪张图片
        success = data.success ? data.success : 0, // 上传成功的个数
        fail = data.fail ? data.fail : 0;// 上传失败的个数
        
      dd.compressImage({
        filePaths: [data.filePaths[i]],
        compressLevel: 2,
        success: (result) => {
          
          console.log('upooadUrl', that.props.uploadUrl)
          dd.uploadFile({
            url: that.props.uploadUrl,
            fileType: 'image',
            filePath: result.filePaths[0],
            fileName: 'file',
            header: {
              'Authorization': dd.getStorageSync({ 'key': 'token' }).data
            },
            formData: {
              name: data.filePaths[i],
              ...this.props.uploadInfo
            },
            success: (res) => {
              that.$page.hideLoading()
              success++
              let datas = JSON.parse(res.data)

              if(datas.data){
                datas.data.src = result.filePaths[0]
                this.data.imgList = this.data.imgList.concat([datas.data])
                this.data.imgList.slice(0, +this.props.max)
                this.setData({
                  imgList: this.data.imgList,
                  num: this.props.max - this.data.imgList.length,
                  componentErrorFlag: false
                })
                if (success === data.filePaths.length) {
                  // dd.showToast({
                  //   content: '上传成功'
                  // })
                  that.$page.show('上传成功')
                }
                this.props.onGetImageUrl(data.e, this.data.imgList)
              }else{
                // dd.showToast({
                //   content: `上传失败,${datas.message}`
                // })
                that.$page.show(`上传失败,${datas.message}`)
              }
            },
            fail: (res) => {
              fail++
              // dd.showToast({
              //   content: '上传失败'
              // })
              
              that.$page.show('上传失败')
              this.setData({
                clickFlag: true
              })
            },
            complete: () => {
              i++
              if (i === data.filePaths.length) {   // 当图片传完时，停止调用          
                this.setData({
                  clickFlag: true
                })
              } else { // 若图片还没有传完，则继续调用函数
                data.i = i;
                data.success = success;
                data.fail = fail;
                this.uploadimg(data);
              }
            }
          })
        },
        fail(res) {

          // dd.showToast({
          //   content: '压缩失败'
          // })
          this.$page.show('压缩失败')
        }
      })
    },
    getImageUrl(e) {
      let that = this
      if (this.props.loading || this.props.disabled) {
        return
      }
      if (!this.data.clickFlag) {
        // dd.showToast({
        //   content: '上传中，请勿重复点击！'
        // })
        that.$page.show('上传中，请勿重复点击！')
        return
      }
      dd.chooseImage({
        count: this.data.num || +this.props.max,  // 最多可以选择的图片总数  
        // sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有    
        sourceType: this.props.type ? [this.props.type] : ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
        success: (res) => {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图;
          // dd.showLoading({
          //   content: '上传中'
          // });
          that.$page.showLoading('上传中...')
          let arr = []
          this.data.default = arr.concat(res.filePaths)
          this.setData({
            default: this.data.default,
            clickFlag: false
          })
          this.uploadimg({
            e,
            filePaths: this.data.default
          })
        },
      });
    },
    removeImage(e) {
      if (this.props.disabled) {
        return
      }
      let index = e.target.dataset.index
      let { accessKey, accessNo } = this.props.uploadInfo
      dd.api.delFileUrl({
        data: {
          accessKey,
          accessNo,
          fileId: this.props.data[index].fileId
        }
      }).then(res => {
        this.props.data.splice(index, 1)
        this.setData({
          imgList: this.props.data,
          num: this.props.max - this.props.data.length
        })
        this.props.onRemoveImage(e, index, this.props.data)
      })
    },
    // 验证输入格式不为空
    validateInputRequired(value, label) {
      let { required, title, disabled } = this.props
      let flag = false
      let checkRequire = String(required) === 'true' ? true : false
      let checkDisable = String(disabled) === 'true' ? true : false
      if (checkRequire && !checkDisable) {
        if ((value + '').trim() === '') {
          this.setData({
            componentErrorFlag: true,
          })
          label !== undefined && label !== "" ? this.$page.show(`${label}不能为空！`) : this.$page.show(`${title}不能为空！`)
          flag = true
        }
      }
      return !flag
    },
  },
});
