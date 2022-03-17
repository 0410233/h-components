import { addCssUnit } from "../utils";

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
    paddingX: String,
    px: {
      type: String,
      value: '0',
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
    'height,paddingX,px': function() {
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

      let px = props.paddingX || props.px || '';
      px = px.split(' ');
      const pl = px[0] || 0;
      const pr = px[1] || pl;
      style.push(`padding-left:` + addCssUnit(pl));
      style.push(`padding-right:` + addCssUnit(pr));

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
        this.data._parent.tapTab(this);
      }
    },
  },
});
