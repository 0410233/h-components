// components/tabs/tabs.js
import { addCssUnit, getRect, objectToStyle, styleToObject } from "../utils";

Component({
  relations: {
    './h-tab': {
      type: 'child',
      linked(target) {
        target.setParent(this);
        this.addTab(target);
      },
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // 指定当前值
    value: null,

    // 指定高度
    height: String,

    // 指定排列方式
    justify: String,

    // 指定样式（当包含高度时，优先级比 height 高）
    customStyle: String,

    // 指定是否显示装饰线
    underline: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: "",

    current: 0,
    lineOffset: 0,
    scrollLeft: 0,

    _scrollable: false,
    _currentTab: null,
    _tabs: [],
  },

  observers: {
    'value': function(value) {
      const currentTab = this.data._currentTab;
      if (currentTab && currentTab.properties.value == value) {
        return;
      }
      const tab = this.data._tabs.find(x => {
        return x.properties.value == value;
      });
      if (tab) {
        this.switchTo(tab);
      }
    },

    'height,justify,customStyle': function() {
      this.updateStyle();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 更新样式
    updateStyle() {
      const props = this.properties;
      let style = styleToObject(props.customStyle);
      if (props.height && !style.height) {
        style.height = addCssUnit(props.height);
      }
      if (props.justify && !style['justify-content']) {
        style['justify-content'] = getJustify(props.justify);
      }
      style = objectToStyle(style);
      console.log('style', style)
      this.setData({style});
    },

    getJustify(justify) {
      const map = {
        'start': 'flex-start',
        'flex-start': 'flex-start',
        'end': 'flex-end',
        'flex-end': 'flex-end',
        'center': 'center',
        'between': 'space-between',
        'space-between': 'space-between',
        'around': 'space-around',
        'space-around': 'space-around',
        'evenly': 'space-evenly',
        'space-evenly': 'space-evenly',
      };
      return map[justify] || 'flex-start';
    },

    addTab(tab) {
      const value = this.properties.value;
      const index = this.properties.index;
      this.data._tabs.push(tab);
      if (value != null && tab.properties.value == value) {
        this.switchTo(tab);
      } else if (index > 0 && this.data._tabs.length == index+1) {
        this.switchTo(tab);
      }
      else if (! this.data._currentTab) {
        this.switchTo(tab);
      }
      
      if (!this.data._scrollable) {
        this.calcScrollable(tab);
      }
    },

    switchTo(tab) {
      if (this.data._currentTab) {
        this.data._currentTab.deactive();
      }
      tab.active();
      this.setData({_currentTab: tab})
      const index = this.data._tabs.indexOf(tab);
      this.setLineOffset(index);
      this.setScrollLeft(index);
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

    tapTab(tab) {
      this.switchTo(tab);
      this.triggerEvent('change', {value: tab.properties.value});
    },
  },
});
