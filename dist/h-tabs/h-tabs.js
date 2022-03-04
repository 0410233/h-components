// components/tabs/tabs.js
import { getRect } from "../utils";

Component({
  relations: {
    './h-tab': {
      type: 'child',
      linked(target) {
        // console.log('parent received child')
        target.setParent(this);
        this.addTab(target);
      },
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {
    index: Number,
    height: Number,
    underline: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    listStyle: '',
    lineOffset: 0,
    scrollLeft: 0,
    _scrollable: false,
    _currentTab: null,
    _tabs: [],
  },

  lifetimes: {
    attached: function() {
      if (this.properties.index) {
        this.setData({current: this.properties.index});
      }
      const listStyle = this.getStyle();
      this.setData({
        listStyle: listStyle.join(';'),
      });
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addTab(tab) {
      this.data._tabs.push(tab);
      if (! this.data._currentTab) {
        this.switchTab(tab);
      }
      else if (this.properties.index > 0 && this.data._tabs.length == index+1) {
        this.switchTab(tab);
      }
      if (!this.data._scrollable) {
        this.calcScrollable(tab);
      }
    },

    switchTab: function(tab) {
      if (this.data._currentTab) {
        this.data._currentTab.deactive();
      }
      tab.active();
      this.setData({_currentTab: tab})
      const index = this.data._tabs.indexOf(tab);
      this.triggerEvent('change', {index, value: tab.properties.value});
      this.setLineOffset(index);
      this.setScrollLeft(index);
    },

    getStyle() {
      const listStyle = [];
      const props = this.properties;
      if (props.height) {
        listStyle.push(`height:${props.height}rpx`);
      }

      return listStyle;
    },

    calcScrollable(tab) {
      Promise.all([
        getRect(this, '.h-tabs__scroll'),
        getRect(tab, '.h-tab'),
      ]).then(results => {
        const scrollRect = results[0] || null;
        const tabRect = results[1] || null;
        if (scrollRect && tabRect && tabRect.right > scrollRect.right) {
          this.setData({_scrollable: true});
        } else {
          this.setData({_scrollable: false});
        }
      });
    },

    setLineOffset(index) {
      if (!this.properties.underline) {
        return Promise.resolve(null);
      }

      if (index == null) {
        index = 0;
      }
      const tab = this.data._tabs[index];
      if (! tab) {
        return Promise.resolve(null);
      }
      return Promise.all([
        getRect(this, '.h-tabs__wrapper'),
        getRect(tab, '.h-tab'),
      ]).then(results => {
        const parentRect = results[0] || null;
        const tabRect = results[1] || null;
        if (parentRect && tabRect) {
          this.setData({
            lineOffset: tabRect.left - parentRect.left + tabRect.width / 2,
          });
        }
      });
    },

    setScrollLeft(index) {
      if (!this.data._scrollable) {
        return Promise.resolve(null);
      }
      if (index == null) {
        index = 0;
      }
      const tab = this.data._tabs[index];
      if (! tab) {
        return Promise.resolve(null);
      }
      return Promise.all([
        getRect(this, '.h-tabs__scroll'),
        getRect(this, '.h-tabs__wrapper'),
        getRect(tab, '.h-tab'),
      ]).then(results => {
        const scrollRect = results[0] || null;
        const wrapperRect = results[1] || null;
        const tabRect = results[2] || null;
        if (scrollRect && wrapperRect && tabRect) {
          const offset = tabRect.right - wrapperRect.left - scrollRect.width;
          const scrollLeft = offset > 0 ? offset : 0;
          if (this.data.lineOffset != scrollLeft) {
            this.setData({scrollLeft});
          }
        }
      });
    },
  },
})
