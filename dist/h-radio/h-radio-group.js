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

  options: {
    pureDataPattern: /^_/,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    value: {
      type: Number,
      optionalTypes: [String],
    },
    justify: {
      type: String,
      value: 'flex-start',
      observer: 'updateStyle',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: 'justify-content: flex-start',
    _selected: null,
    _children: [],
  },

  observers: {
    'value': function(val) {
      // console.log('h-radio-group.observers.value');
      if (val != this.data._selected) {
        this.changeValue(val);
      }
    }
  },

  lifetimes: {
    ready() {
      this.checkChildren();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addChild(child) {
      this.data._children.push(child);
    },

    updateStyle() {
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
      this.setData({
        style: 'justify-content:' + (map[this.properties.justify] || 'flex-start'),
      });
    },

    check(value) {
      // console.log('h-radio-group.check');
      this.changeValue(value).then(() => {
        this.triggerEvent('change', {value});
      });
    },

    changeValue(value) {
      // console.log('h-radio-group.changeValue');
      return new Promise(resolve => {
        this.setData({
          _selected: value,
        }, () => {
          this.checkChildren();
          resolve(value);
        });
      });
    },

    checkChildren() {
      // console.log('h-radio-group.checkChildren');
      const value = this.data._selected;
      this.data._children.forEach(child => {
        if (child.properties.value != value) {
          child.uncheck();
        } else {
          child.check();
        }
      });
    },
  },
});
