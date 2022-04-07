// h-components/h-alert/h-alert.js
Component({
  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    content: String,
    btnText: {
      type: String,
      value: '确认',
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
    iBtnText: '确定',
    iContent: '',
    iPopupStyle: '',

    callbacks: [],
  },

  observers: {
    'visible,content,btnText,zIndex': function() {
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
      if (data.iBtnText !== props.btnText) {
        change.iBtnText = props.btnText;
      }
      if (data.zIndex !== props.btnText) {
        change.iBtnText = props.btnText;
      }
      this.setData(change);
    },

    ok() {
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
      if (_isUseInJs) {
        this.data.callbacks.forEach(cb => {
          cb();
        });
      }
    },

    /**
     * 用户 js 调用
     * @param {Function} cb 
     */
    handleHide(cb) {
      if (cb) {
        const callbacks = this.data.callbacks;
        callbacks.push(cb);
        this.setData({callbacks});
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
        iBtnText: options.btnText || '确定',
        iContent: options.content || '',
      };

      if (options.zIndex > 0) {
        data.iPopupStyle = 'z-index:' + options.zIndex;
      }

      this.setData(data);
      return new Promise(resolve => {
        this.handleHide(resolve);
      });
    },
  },
});
