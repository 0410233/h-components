// h-components/h-price/h-price.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    price: null,
    symbol: {
      type: String,
      value: '￥',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    value: 0,
  },

  observers: {
    'price': function(price) {
      price = Number(price) || 0;
      if (this.data.value != price) {
        this.setData({value: price});
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
});
