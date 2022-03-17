// h-components/h-alert/h-alert.js
Component({
  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
    },
    confirmText: {
      type: String,
      value: '确认',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    hideConfirm: {
      type: Boolean,
      value: false,
    },
    hideCancel: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    innerVisible: false,
  },

  observers: {
    'visible': function(visible) {
      if (this.data.innerVisible !== visible) {
        this.setData({innerVisible: visible});
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    confirm() {
      this.setData({innerVisible: false});
      this.triggerEvent('confirm');
    },
    cancel() {
      this.setData({innerVisible: false});
      this.triggerEvent('cancel');
    },
  },
});
