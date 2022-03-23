// components/h-page/h-page.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    page: String,
    name: String,
    title: String,
    customStyle: {
      type: String,
      value: 'padding-bottom:16px;',
    },
    navbarBorder: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  lifetimes: {
    attached() {
      const page = this.selectOwnerComponent();
      if (page && !page.data._he_page) {
        page.setData({_he_page: this});
      }
    },
  },

  methods: {
    showAlert(options) {
      const alertBox = this.selectComponent('#he_page_alert');
      // console.log('alertBox', alertBox)
      if (alertBox) {
        return alertBox.show(options);
      } else {
        return Promise.reject('找不到组件');
      }
    },
  },
});
