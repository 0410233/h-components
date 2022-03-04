// h-components/h-line/h-line.js

import { formatCssSize } from "../utils";

Component({
  options: {
    pureDataPattern: /^_/,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    w: {
      type: String,
      value: '100%',
    },
    width: String,

    h: {
      type: String,
      value: '1rpx',
    },
    height: String,

    round: String,
    color: {
      type: String,
      value: '#e8e8e8',
    },
    marginX: String,
    mx: String,
    marginY: String,
    my: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: String,
  },

  lifetimes: {
    attached() {
      this.computeStyle();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    computeStyle() {
      const style = [];
      const props = this.properties;

      const width = formatCssSize(props.width || props.w);
      style.push(`width:${width}`);

      const height = formatCssSize(props.height || props.h);
      style.push(`height:${height}`);
      
      const round = formatCssSize(props.round);
      if (round) {
        style.push(`border-radius:${props.round}`);
      }

      if (props.color) {
        style.push(`background:${props.color}`);
      }

      const margin = this.computeMargin();
      style.push('margin:' + margin.join(' '));

      this.setData({style: style.join(';')});
    },

    computeMargin() {
      const props = this.properties;

      let mx = props.marginX || props.mx;
      mx = String(mx || '').trim().split(' ');

      let my = props.marginY || props.my;
      my = String(my || '').trim().split(' ');

      const TOP = 0, RIGHT = 1, BOTTOM = 2, LEFT = 3;
      const margin = [];
      margin[LEFT] = mx[0] || '0';
      margin[RIGHT] = mx[1] || margin[LEFT];
      margin[TOP] = my[0] || '0';
      margin[BOTTOM] = my[1] || margin[TOP];

      return margin.map(formatCssSize);
    },
  },
});
