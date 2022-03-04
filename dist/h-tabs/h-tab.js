// components/h-tabs/h-tab.js
Component({
  options: {
    pureDataPattern: /^_/,
  },

  relations: {
    './h-tabs': {
      type: 'parent',
      // linked(target) {
      //   console.log('child added to parent')
      //   target.addTab(this);
      // },
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
    height: Number,
    paddingX: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCurrent: false,
    style: '',
    _parent: null,
  },

  observers: {
    'height,paddingX': function() {
      this.computeStyle();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    computeStyle() {
      const style = [];
      const props = this.properties;
      if (props.height > 0) {
        style.push(`height:${props.height}rpx`);
      }
      // console.log(props)
      if (props.paddingX > 0) {
        style.push(`padding-left:${props.paddingX}rpx`);
        style.push(`padding-right:${props.paddingX}rpx`);
      }
      this.setData({style: style.join(';')});
    },
    setParent(parent) {
      this.setData({_parent: parent});
    },
    deactive() {
      this.setData({isCurrent: false});
    },
    active() {
      this.setData({isCurrent: true});
    },
    onTap() {
      if (this.data._parent) {
        this.data._parent.switchTab(this);
      }
    },
  }
})
