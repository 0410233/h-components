// components/h-nav/h-nav.js

const app = getApp();

Component({
  options: {
    multipleSlots: true,
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,

    placeholder: {
      type: Boolean,
      value: false,
    },

    border: {
      type: Boolean,
      value: true,
    },

    customStyle: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    height: app.globalData.navBarBox.height,
    padding: app.globalData.navBarBox.padding,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeftArrowTap(e) {
      this.triggerEvent('left-tap');
    },
  },
});
