// h-components/h-radio/h-radio-group.js

Component({
  relations: {
    './h-radio': {
      type: 'child',
      linked(target) {
        this.addChild(target);
      },
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {
    value: null,
    customStyle: String,
    disabled: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    _selected: null,
    _children: [],
  },

  observers: {
    'value': function(val) {
      if (val != this.data._selected) {
        this.changeValue(val);
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addChild(child) {
      this.data._children.push(child);
      const value = child.properties.value;
      if (value == this.properties.value) {
        this.data._selected = value;
        child.check();
      }
    },

    changeValue(value) {
      console.log('h-radio-group.changeValue', value);
      this.setData({_selected: value});
      this.data._children.forEach(child => {
        if (child.properties.value == value) {
          child.check();
        } else {
          child.uncheck();
        }
      });
    },

    // h-radio 点击
    handleRadioTap(child) {
      // console.log('h-radio-group.check');
      const value = child.properties.value;
      this.changeValue(value);
      this.triggerEvent('change', {value});
    },
  },
});
