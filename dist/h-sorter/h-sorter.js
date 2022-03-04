// h-components/h-sorter/h-sorter.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    label: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    status: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle() {
      let status = this.data.status + 1;
      if (status > 1) {
        status = -1;
      }
      this.setData({status}, () => {
        this.triggerEvent('change', {status});
      });

      wx.showToast({
        title: this.properties.label + (['降序', '默认', '升序'])[status+1],
        icon: 'none',
      });
    }
  }
})
