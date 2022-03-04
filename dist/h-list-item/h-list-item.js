// components/h-list-item/h-list-item.js

import { formatCssSize, formatIconSize } from "../utils";

Component({
  options: {
    multipleSlots: true,
  },
  
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    value: String,
    icon: {
      type: String,
      value: '/images/icon-linkto.png',
    },
    iconSize: {
      type: String,
      value: '12rpx 24rpx',
      observer: 'updateIcon',
    },
    url: String,
    height: {
      type: String,
      value: '106rpx',
      observer: 'update',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: 'height:106rpx',
    iconStyle: 'width:12rpx;height:24rpx',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update() {
      const style = [];
      const props = this.properties;

      if (props.height) {
        style.push('height:' + formatCssSize(props.height));
      }

      this.setData({style: style.join(';')});
    },

    updateIcon() {
      const props = this.properties;
      const size = formatIconSize(props.iconSize);
      this.setData({
        iconStyle: `width:${size[0]};height:${size[1]};`,
      });
    },

    onTap() {
      const props = this.properties;
      if (props.url) {
        wx.navigateTo({url: props.url});
      }
    },
  },
});
