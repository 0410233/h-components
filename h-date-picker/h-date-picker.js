// h-components/h-date-picker/h-date-picker.js
import { formatNumber } from "../utils";
import { toDate, endOfMonth } from "../time";

const today = new Date();
const thisYear = today.getFullYear();

const years = [];
for (let i = 0; i < 80; i++) {
  years.push(thisYear - i);
}
years.reverse();

const months = [];
for (let i = 1; i <= 12; i++) {
  months.push(formatNumber(i));
}

const defaultDays = [];
const endDate = endOfMonth(today).getDate();
for (let i = 1; i <= endDate; i++) {
  defaultDays.push(formatNumber(i));
}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    value: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    columns: [years.length-1, today.getMonth(), today.getDate()-1],
    years: years,
    months: months,
    days: defaultDays,
    _currentDate: null,
    _timer: null,
  },

  observers: {
    'value': function(value) {
      // console.log('value', value)
      // console.log('_currentDate', this.data._currentDate)
      if (value != this.data._currentDate) {
        this.update();
      }
    }
  },

  lifetimes: {
    attached() {
      if (!this.properties.value) {
        this.update();
      }
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onDateChange(e) {
      clearTimeout(this.data._timer);
      const timer = setTimeout(() => {
        this.changeDate(e.detail.value);
      }, 200);
      this.setData({_timer: timer});
    },

    update() {
      const value = this.properties.value;
      const date = value ? toDate(value) : new Date();
      
      let year = years.indexOf(date.getFullYear());
      if (year < 0) {
        year = 0;
      }

      this.changeDate([year, date.getMonth(), date.getDate()-1]);
    },

    changeDate(columns) {
      columns = columns.slice();
      const YEAR = 0, MONTH = 1, DAY = 2;

      const current = new Date(years[columns[YEAR]], months[columns[MONTH]], 0);
      // console.log('current', current)
      const days = [];
      for (let i = 1; i <= current.getDate(); i++) {
        days.push(formatNumber(i));
      }

      if (columns[DAY] > days.length - 1) {
        columns[DAY] = days.length - 1;
      }
      const date = ([
        years[columns[YEAR]],
        months[columns[MONTH]],
        days[columns[DAY]],
      ]).join('-');

      this.setData({
        columns: columns,
        days: days,
        _currentDate: date,
      }, () => {
        this.triggerEvent('change', {value: date});
      });
    },
  },
});
