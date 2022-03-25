// h-components/h-page-bottom/h-page-bottom.js

import { getSafeAreaInsetBottom, getRect, addCssUnit } from "../utils";

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
    height: String,
    minHeight: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    safeAreaInsetBottom: 0,
    iHeight: 0,
  },

  lifetimes: {
    ready() {
      this.setData({
        safeAreaInsetBottom: getSafeAreaInsetBottom(),
      });
      const props = this.properties;
      if (props.placeholder) {
        if (props.height) {
          this.setData({iHeight: addCssUnit(props.height)});
        } else {
          getRect(this, '.h-page-bottom').then(rect => {
            let height = rect?.height;
            if (height) {
              height += 'px';
            } else {
              height = addCssUnit(props.minHeight || 98);
            }
            this.setData({iHeight: height});
          });
        }
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
});
