// components/h-page/h-page.js
const app = getApp();

Component({
  options: {
    pureDataPattern: /^_/,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    page: String,
    navbarBorder: {
      type: Boolean,
      value: true,
    },
    tabbarBorder: {
      type: Boolean,
      value: false,
    },
    customTabbar: {
      type: Boolean,
      value: false,
      observer: 'update',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabBarHeight: 0,
    style: '',
  },

  observers: {
    'tabBarHeight': function() {
      this.computeStyle();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update() {
      const customTabbar = this.properties.customTabbar;
      if (! customTabbar) {
        this.setData({
          tabBarHeight: 0,
        });
      } else {
        const tabBarHeight = app.globalData.tabBarHeight;
        const safeAreaInsetBottom = app.globalData.safeAreaInsetBottom;

        const tabbar = typeof this.getTabBar == 'function' ? this.getTabBar() : null;

        if (tabbar) {
          this.setData({
            tabBarHeight: tabBarHeight + safeAreaInsetBottom,
          });
          tabbar.setCurrentPage(app.currentPage());
        }
      }
    },

    computeStyle() {
      const props = this.properties;
      const data = this.data;

      const style = [];
      style.push(`padding-bottom:${data.tabBarHeight + 16}px`);

      this.setData({style: style.join(';')});
    },
  },
});
