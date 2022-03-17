// h-components/h-popup/h-popup.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    closeOnClickOverlay: {
      type: Boolean,
      value: true,
    },
    customStyle: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
  },

  observers: {
    'visible': function(visible) {
      visible = Boolean(visible);
      if (this.data.show !== visible) {
        this.setData({show: visible});
        if (visible) {
          this.triggerEvent('show');
        }
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onOverlayClick() {
      if (this.properties.closeOnClickOverlay) {
        this.setData({show: false});
        this.triggerEvent('hide');
      }
    },

    noop() {},
  },
});
