// h-components/h-rate/h-rate.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    readonly: {
      type: Boolean,
      value: false,
    },
    value: {
      type: Number,
      value: 0,
      observer: function(val) {
        if (val != this.data.current) {
          this.setData({current: val});
        }
      },
    },
    iconActive: {
      type: String,
      value: '/images/icon-star-active.png',
    },
    iconDeactive: {
      type: String,
      value: '/images/icon-star-deactive.png',
    },
    iconSize: {
      type: String,
      value: '24',
      observer: 'updateSize',
    },
    spacing: {
      type: Number,
      value: 12,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    width: 24,
    height: 24,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateSize() {
      const size = this.properties.iconSize.split(' ');
      const width = parseFloat(size[0]) || 24;
      const height = parseFloat(size[1]) || width;
      this.setData({width, height});
    },
    
    onTap(e) {
      if (this.properties.readonly) {
        return;
      }
      const value = e.currentTarget.dataset.value;
      console.log('value', value)
      this.setData({
        current: value,
      });
    },
  },
});
