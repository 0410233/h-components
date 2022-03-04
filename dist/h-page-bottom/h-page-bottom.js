// h-components/h-page-bottom/h-page-bottom.js

import { getSafeAreaInsetBottom, getRect } from "../utils";

Component({
  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    safeAreaInsetBottom: 0,
    height: 0,
  },

  lifetimes: {
    ready() {
      this.setData({
        safeAreaInsetBottom: getSafeAreaInsetBottom(),
      });
      if (this.properties.placeholder) {
        getRect(this, '.h-page-bottom').then(rect => {
          this.setData({
            height: rect.height || 0,
          })
        });
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
});
