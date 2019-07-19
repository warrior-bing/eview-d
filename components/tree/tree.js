Component({
  props: {
    value: [],
    contentKey: 'title',
    selthis: (e) => { }
  },
  data: {
    outValue: [],
    currentPath: []
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
      if (this.props.value.length > 0) {
        this.setData({
          outValue: this.props.value
        });
      }      
    },

    toggle: function(e) {
      const currentIndex = e.currentTarget.dataset.index;
      const currentText = e.currentTarget.dataset.text;
      const isFolder = e.currentTarget.dataset.isfolder;
      if (isFolder) {
        const outValue = this._findChild(currentText, this.data.outValue);
        this.setData({
          outValue: outValue,
          currentPath: [
            ...this.data.currentPath,
            { text: currentText, index: currentIndex }
          ]
        })
      } else {
        
        let resultValue = this._findFather(this.$page.data.value, currentText)
        console.log('我选中的是', resultValue)
      }
    },
    _findChild: function(currentText, arr) {
      const that = this;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].title == currentText) {
          arr[i].isOpen = !arr[i].isOpen;
          break;
        }
        if (arr[i].children && arr[i].children.length > 0) {
          that._findChild(currentText, arr[i].children)
        }
      }
      return arr;
    },

    _findFather: function(array, label) {
      let stack = [];
      let going = true;

      let walker = (array, label) => {
        array.forEach(item => {
          if (!going) return;
          stack.push(item['title']);
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

      return stack.join(',');
    },

    tapBtn(e) {
      let str = ''
      this.data.currentPath.forEach((item) => {
        str += item.text + ','
      })
      console.log('我选中的是', e.currentTarget.dataset.item, str.split(','))
    },
   
  }
});
