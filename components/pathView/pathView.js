// components/path-view/path-view.js
import toTree from './toTree';
Component({
  props: {
    value: [],
    fatherKey: 'pid',
    selfKey: 'id',
    rootValue: null,
    selthis: (e) => { }
  },
  data: {
    searchCode: '',
    normalValue: [],
    copyValue: []
  },
  didMount() {
    this.initView()
  },
  didUpdate(oldProps, oldData) {
    if (this.props.value != oldProps.value) {
      // console.log('update')
      this.initView()
    }
  },
  didUnmount() { },
  methods: {
    initView() {
      // 优先使用value 
      let _value = []
      console.log('initView1111111', this.props.value)
      if (this.props.value.length > 0) {
        if (this.props.value[0].children != undefined) {
          _value = this.props.value
        } else {
          _value = this.normalizeValue()
        }
console.log('initView', _value)
        this.setData({
          normalValue: this._initFolder(_value),
          copyValue: JSON.parse(JSON.stringify(_value))
        })
      }
      
    },
    getValue(e) {
      this.setData({
        searchCode: e.detail.value
      })
    },

    resetData() {
      this.setData({
        searchCode: '',
        normalValue: this.data.copyValue
      })
    },
    searchData() {
      let { normalValue, searchCode } = this.data
      console.log('11111', this.props.value)
      if (searchCode == '') {
        this.setData({
          normalValue: this.data.copyValue
        })
        return
      }

      let stack = this._findFather(this.data.copyValue, searchCode)
      if (typeof stack == 'string') {
        this.$page.show(stack)
        return
      }

      this.setData({
        normalValue: [].concat(stack[0])
      })

    },

    _initFolder: function(arr) {
      const that = this;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children && arr[i].children.length > 0) {
          arr[i].isFolder = true;
          that._initFolder(arr[i].children);
        } else {
          arr[i].isFolder = false;
        }
        arr[i].isOpen = false;
      }
      return arr;
    },

    _findFather(array, label) {
      let stack = [];
      let going = true;

      let walker = (array, label) => {

        array.forEach(item => {
          if (!going) return;

          stack.push(item);
          if (item['title'] === label) {
            going = false;
          } else if (item['children']) {
            walker(item['children'], label);
          } else {

            stack.pop();
          }
        });

        if (going) stack.pop();
      }

      walker(array, label);
      let stackLength = stack.length
      if (stack[stackLength - 1] == undefined || stack[stackLength - 1].children != undefined) {
        return '未找到匹配项'
      }
      for (let i = 0; i < stackLength - 1; i++) {

        stack[i].children = [].concat(stack[i + 1])
        stack[i].isOpen = true
      }

      return stack;
    },

    // 将非标准值标准化
    normalizeValue() {
      return toTree({
        value: this.props.value,
        fatherKey: this.props.fatherKey,
        selfKey: this.props.selfKey,
        rootValue:
          this.props.rootValue === null
            ? undefined
            : this.props.rootValue
      });
    },

  }
});
