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

  /**
   * 组件的属性列表
   */
  properties: {
    value: Array,
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
    _value: [],
    _children: [],
  },

  observers: {
    'value': function(value) {
      if (!Array.isArray(value) || this.isEqualArray(value, this.data._value)) {
        return;
      }
      this.changeValue(value);
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addChild(child) {
      this.data._children.push(child);
    },

    /**
     * 比较两个数组元素是否相同
     * @param {Array} value 
     */
    changeValue(value) {
      this.setData({_value: value});
      this.data._children.forEach(child => {
        const childValue = child.properties.value;
        if (value.findIndex(val => val == childValue) >= 0) {
          child.check();
        } else {
          child.uncheck();
        }
      });
    },

    /**
     * h-checkbox 点击
     */
    handleCheckboxTap() {
      const value = [];
      this.data._children.forEach(child => {
        if (child.data.isChecked) {
          value.push(child.properties.value)
        }
      });
      this.setData({_value: value});
      this.triggerEvent('change', {value});
    },

    /**
     * 比较两个数组元素是否相同
     * @param {Array} a1 
     * @param {Array} a2 
     * @returns {Boolean}
     */
    isEqualArray(a1, a2) {
      if (a1 === a2) {
        return true;
      }
      if (a1.length != a2.length) {
        return false;
      }
      for (let i = 0; i < a1.length; i++) {
        for (let j = 0; j < a2.length; j++) {
          if (a1[i] != a2[j]) return false;
        }
      }
      return true;
    },
  },
});
