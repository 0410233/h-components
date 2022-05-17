// h-components/h-confirm/h-confirm.js
Component({
  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
    confirmText: {
      type: String,
      value: '确认',
    },
    cancelText: {
      type: String,
      value: '取消',
    },
    visible: {
      type: Boolean,
      value: false,
    },
    zIndex: Number,
  },

  /**
   * 组件的初始数据
   */
  data: {
    _isUseInJs: false,
    isVisible: false,
    iConfirmText: '确定',
    iCancelText: '取消',
    iContent: '',
    iPopupStyle: '',

    confirmCallbacks: [],
    cancelCallbacks: [],
  },

  observers: {
    'visible,content,confirmText,cancelText,zIndex': function() {
      this.update();
    },

    'zIndex': function(zIndex) {
      if (!this.data._isUseInJs && zIndex > 0) {
        const iPopupStyle = 'z-index:' + zIndex;
        this.setData({iPopupStyle});
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    update() {
      const data = this.data;
      const props = this.properties;
      if (data._isUseInJs) {
        return;
      }

      const change = {};
      if (data.isVisible !== props.visible) {
        change.isVisible = props.visible;
      }
      if (data.iContent !== props.content) {
        change.iContent = props.content;
      }
      if (data.iConfirmText !== props.confirmText) {
        change.iConfirmText = props.confirmText;
      }
      if (data.iCancelText !== props.cancelText) {
        change.iCancelText = props.cancelText;
      }
      this.setData(change);
    },

    confirm() {
      const _isUseInJs = this.data._isUseInJs;
      this.setData({
        isVisible: false,
        _isUseInJs: false,
      }, () => {
        if (_isUseInJs) {
          this.update();
        }
      });
      this.triggerEvent('ok');
      this.triggerEvent('confirm');
      if (_isUseInJs) {
        this.data.confirmCallbacks.forEach(cb => {
          cb();
        });
      }
    },

    cancel() {
      const _isUseInJs = this.data._isUseInJs;
      this.setData({
        isVisible: false,
        _isUseInJs: false,
      }, () => {
        if (_isUseInJs) {
          this.update();
        }
      });
      this.triggerEvent('cancel');
      if (_isUseInJs) {
        this.data.cancelCallbacks.forEach(cb => {
          cb();
        });
      }
    },

    /**
     * 用户 js 调用
     * @param {Function} cb 
     */
    handleConfirm(cb) {
      if (cb) {
        const callbacks = this.data.confirmCallbacks;
        callbacks.push(cb);
        this.setData({confirmCallbacks: callbacks});
      }
    },

    /**
     * 用户 js 调用
     * @param {Function} cb 
     */
    handleCancel(cb) {
      if (cb) {
        const callbacks = this.data.cancelCallbacks;
        callbacks.push(cb);
        this.setData({cancelCallbacks: callbacks});
      }
    },

    /**
     * js 调用
     * @param {Object} options 
     */
    show(options) {
      options = options || {};
      
      const data = {
        _isUseInJs: true,
        isVisible: true,
        iConfirmText: options.confirmText || '确定',
        iCancelText: options.cancelText || '取消',
        iContent: options.content || '',
      };

      if (options.zIndex > 0) {
        data.iPopupStyle = 'z-index:' + options.zIndex;
      }

      this.setData(data);

      return new Promise((resolve, reject) => {
        this.handleConfirm(resolve);
        this.handleCancel(reject);
      });
    },
  },
});
