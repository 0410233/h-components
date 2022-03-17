import { addCssUnit } from "../utils";

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
    innerValue: 0,
    width: '24rpx',
    height: '24rpx',
  },

  observers: {
    'value': function(value) {
      if (value != this.data.innerValue) {
        this.setData({innerValue: value});
      }
    },

    'iconSize': function(size) {
      size = size.split(' ').map(addCssUnit);
      const width = size[0] || '24rpx';
      const height = size[1] || width;
      this.setData({width, height});
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap(e) {
      if (this.properties.readonly) {
        return;
      }
      const value = e.currentTarget.dataset.value;
      this.setData({innerValue: value});
      this.triggerEvent('change', {value});
    },
  },
});
