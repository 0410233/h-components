// h-components/h-checkbox/h-checkbox-group.js

Component({
  relations: {
    './h-checkbox': {
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
      type: Array,
      observer: 'update',
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
    _value: [],
    _children: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addChild(child) {
      this.data._children.push(child);
    },

    update() {
      if (! this.isChanged()) {
        return;
      }

      const value = this.properties.value || [];

      this.setData({
        _value: value.slice(),
      }, () => {
        this.data._children.forEach(child => {
          if (value.indexOf(child.properties.value) >= 0) {
            child.check();
          } else {
            child.uncheck();
          }
        });
      });
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

    isChanged() {
      const value = this.properties.value || [];
      const current = this.data._value || [];
      for (let i = 0; i < value.length; i++) {
        if (current.indexOf(value[i] < 0)) {
          return true;
        }
      }
      return false;
    },

    changeValue() {
      const value = [];
      this.data._children.forEach(child => {
        if (child.data.isChecked) {
          value.push(child.properties.value)
        }
      });
      this.triggerEvent('change', {value});
    },
  },
});
