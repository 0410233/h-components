// h-components/h-sorter/h-sorter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: String,
    order: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: 0,
  },

  observers: {
    'order': function(order) {
      order = parseInt(order) || 0;
      if (order !== this.data.status && order >= 0 && order <= 2) {
        this.setData({status: order});
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle() {
      const status = (this.data.status + 1)%3;
      this.setData({status}, () => {
        this.triggerEvent('change', {status});
      });
    },
  },
});
