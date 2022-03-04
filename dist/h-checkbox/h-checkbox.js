// h-components/h-checkbox/h-checkbox.js
Component({
  options: {
    pureDataPattern: /^_/,
    multipleSlots: true,
  },

  relations: {
    './h-checkbox-group': {
      type: 'parent',
      linked(target) {
        this.setParent(target);
      },
    },
  },

  /**
   * 组件的属性列表
   */
  properties: {
    // checkbox 值
    value: {
      type: Number,
      optionalTypes: [String],
    },

    // 图标-选中
    iconChecked: {
      type: String,
      value: 'icon-checked.png',
      observer: 'computeIconPath',
    },

    // 图标-未选中
    iconUnchecked: {
      type: String,
      value: 'icon-unchecked.png',
      observer: 'computeIconPath',
    },

    // 图标大小
    iconSize: {
      type: Number,
      value: 0,
      observer: 'computeStyle',
    },

    // 图标相对文字位置
    iconPosition: {
      type: String,
      value: 'left',
      observer: 'computeStyle',
    },

    // 图标与文字间距
    spacing: {
      type: Number,
      value: 12,
      observer: 'computeStyle',
    },

    // 组件周围留白（可扩大点击区域）
    padding: {
      type: String,
      value: '0',
      observer: 'computeStyle',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 是否选中
    isChecked: false,

    // 选中图标文件路径
    checkedIcon: '/images/icon-checked.png',

    // 未选中图标文件路径
    uncheckedIcon: '/images/icon-unchecked.png',

    // 整体样式
    style: '',

    // 图标样式
    iconStyle: '',

    // 文字样式
    labelStyle: 'padding-left:12rpx',

    // 父组件 h-checkbox-group
    _parent: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    computeIconPath() {
      const props = this.properties;
      let checkedIcon = props.iconChecked,
        uncheckedIcon = props.iconUnchecked;

      if (checkedIcon.indexOf('/') < 0) {
        checkedIcon = '/images/' + checkedIcon;
      }
      if (uncheckedIcon.indexOf('/') < 0) {
        uncheckedIcon = '/images/' + uncheckedIcon;
      }

      this.setData({checkedIcon, uncheckedIcon});
    },

    computeStyle() {
      const data = this.data;
      const changed = {};

      const style = this.computeCheckboxStyle();
      if (style !== data.style) {
        changed.style = style;
      }
      
      const iconStyle = this.computeIconStyle();
      if (iconStyle !== data.iconStyle) {
        changed.iconStyle = iconStyle;
      }

      const labelStyle = this.computeLabelStyle();
      if (labelStyle !== data.labelStyle) {
        changed.labelStyle = labelStyle;
      }

      this.setData(changed);
    },

    computeCheckboxStyle() {
      const props = this.properties;

      const style = [];
      if (props.padding != null) {
        const padding = props.padding.split(' ').map(x => {
          if (/^[\d.]+$/.test(x)) x += 'rpx';
          return x;
        }).join(' ');
        style.push('padding:'+padding);
      }
      return style.join(';');
    },

    computeIconStyle() {
      const props = this.properties;

      const style = [];
      const size = parseFloat(props.iconSize);
      if (size > 0) {
        style.push(`width:${size}rpx`);
        style.push(`height:${size}rpx`);
      }

      return style.join(';');
    },

    computeLabelStyle() {
      const props = this.properties;

      const style = [];
      const postion = props.iconPosition || 'left';
      const spacing = parseFloat(props.spacing) || 12;
      style.push(`padding-${postion}:${spacing}rpx`);

      return style.join(';');
    },

    setParent(parent) {
      this.setData({_parent: parent});
    },

    uncheck() {
      this.setData({isChecked: false});
    },

    check() {
      this.setData({isChecked: true});
    },

    toggle() {
      const isChecked = !this.data.isChecked;
      this.setData({isChecked}, () => {
        this.data._parent.changeValue();
      });
    },
  }
})
