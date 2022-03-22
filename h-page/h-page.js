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
});
