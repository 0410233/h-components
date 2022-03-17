// h-components/h-date-picker/h-date-picker.js
import { formatNumber } from "../utils";

const date = new Date();
const YEAR = 0, MONTH = 1, DAY = 2;

const years = [];
const thisYear = date.getFullYear();
for (let i = 0; i < 80; i++) {
  years.push(thisYear - i);
}
years.reverse();

const months = [];
for (let i = 1; i <= 12; i++) {
  months.push(formatNumber(i));
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
  },

  observers: {
    'value': function() {
      this.update();
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    date: [years.length-1, date.getMonth(), date.getDate()-1],
    years: years,
    months: months,
    days: [],
    _currentDate: null,
  },

  lifetimes: {
    attached() {
      if (this.properties.value) {
        this.update();
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDateChange(e) {
      this.changeDate(e.detail.value).then(date => {
        this.triggerEvent('change', {value: date});
      });
    },

    update() {
      const value = this.properties.value;
      if (value === this.data._currentDate) {
        return;
      }
      const date = value 
        ? new Date(value.replaceAll('-', '/'))
        : new Date();
      
      let year = years.indexOf(date.getFullYear());
      if (year < 0) {
        year = 0;
      }

      this.changeDate([year, date.getMonth(), date.getDate()-1]);
    },

    changeDate(value) {
      value = value.slice();
      const current = new Date(years[value[YEAR]], months[value[MONTH]], 0);
      const days = [];
      for (let i = 1; i <= current.getDate(); i++) {
        days.push(formatNumber(i));
      }
      if (value[DAY] > days.length - 1) {
        value[DAY] = days.length - 1;
      }
      const date = ([
        years[value[YEAR]],
        months[value[MONTH]],
        this.data.days[value[DAY]],
      ]).join('-');

      return new Promise((resolve) => {
        this.setData({
          date: value,
          days: days,
          _currentDate: date,
        }, () => resolve(date));
      });
    },
  }
})
