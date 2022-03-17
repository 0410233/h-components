import { addCssUnit } from "../utils";

// h-components/h-icon/h-icon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    size: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: '',
  },

  observers: {
    'size': function(size) {
      size = (size || '').split(' ').map(addCssUnit);
      const width = size[0];
      const height = size[1] || width;
      this.setData({
        style: `width:${width};height:${height}`
      });
    }
  },
});
