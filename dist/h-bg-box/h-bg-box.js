// h-components/h-bg-box/h-bg-box.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bg: String,
    width: {
      type: String,
      observer: 'computeStyle',
    },
    height: {
      type: String,
      observer: 'computeStyle',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    computeStyle() {
      const props = this.properties;

      const style = [];
      let width = props.width;
      if (width != null) {
        if (/^[\d.]+$/.test(width)) {
          width += 'rpx';
        }
        style.push('width:' + width);
      }

      let height = props.height;
      if (height != null) {
        if (/^[\d.]+$/.test(height)) {
          height += 'rpx';
        }
        style.push('height:' + height);
      }

      this.setData({style: style.join(';')});
    },
  }
})
