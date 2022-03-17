// components/h-avatar/h-avatar.js

import { addCssUnit, objectToStyle } from "../utils";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
    size: String,
    round: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: 'width:80rpx;height:80rpx;border-radius:50%',
  },

  observers: {
    'size,round': function(size, round) {
      const style = {};

      size = size.split(' ').map(addCssUnit);
      style.width = size[0] || '80rpx';
      style.height = size[1] || style.width;

      style.borderRadius = addCssUnit(round || '50%');

      this.setData({style: objectToStyle(style)});
    },
  },
});
