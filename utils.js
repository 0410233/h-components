import { isObject } from "./validator";

// toast 提醒
export function toast(title, icon="success", duration=2000) {
  if (title.length > 7) {
    icon = 'none';
  }
  return wx.showToast({title, icon, duration});
}

export function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

let systemInfo = null;
export function getSystemInfo() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync(); 
  }
  return systemInfo;
}

let menuBtnRect = null;
export function getMenuButtonRect() {
  if (menuBtnRect == null) {
    menuBtnRect = wx.getMenuButtonBoundingClientRect(); 
  }
  return menuBtnRect;
}

const navbarPaddingBottom = 8;
export function getNavBarHeight() {
  return getMenuButtonRect().bottom + navbarPaddingBottom;
}

export function getNavBarPadding() {
  const sysinfo = getSystemInfo();
  const rect = getMenuButtonRect();
  return {
    top: rect.top,
    bottom: navbarPaddingBottom,
    left: sysinfo.screenWidth - rect.right,
    right: sysinfo.screenWidth - rect.right,
  };
}

export function getSafeAreaInsetBottom() {
  const sysinfo = getSystemInfo();
  return sysinfo.screenHeight - sysinfo.safeArea.bottom;
}

export function getRect(context, selector) {
  return new Promise(function (resolve) {
    wx.createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect(resolve)
      .exec();
  });
}

export function getAllRect(context, selector) {
  return new Promise(function (resolve) {
    wx.createSelectorQuery()
      .in(context)
      .selectAll(selector)
      .boundingClientRect(resolve)
      .exec();
  });
}

/**
 * 格式化 css 尺寸
 * @param {number|string} val 
 * @param {number|string} def 
 * @returns {string}
 */
export function formatCssSize (val, def = '0') {
  if (val == 0) {
    return '0';
  }
  if (!val) {
    return def;
  }
  if (/^[\d.]+$/.test(val)) {
    val += 'rpx';
  }
  return val;
}

export function addCssUnit(val) {
  if (!val || val == 0) {
    return '0';
  }
  if (/^[\d.]+$/.test(val)) {
    val += 'rpx';
  }
  return val;
}

/**
 * 格式化尺寸 'w h' => [width, height]
 * @param {string|number} size 
 */
export function formatIconSize(size) {
  if (!size || size == 0) {
    return ['0', '0'];
  }
  size = String(size).split(' ');
  const width = size[0] || 0;
  const height = size[1] || width;
  return [formatCssSize(width), formatCssSize(height)];
}

// 样式字符串改为对象
export function styleToObject(style) {
  if (!style) {
    return {};
  }
  return style.split(';').reduce((res, item) => {
    item = item.trim().split(':');
    const key = item[0].trim();
    const value = (item[1] || '').trim();
    if (key && value) {
      res[key] = value;
    }
    return res;
  }, {});
}

function kebabCase(word) {
  return word.replace(/[A-Z]/g, c => '-'+c).toLowerCase();
}

export function objectToStyle(obj) {
  if (!obj || !isObject(obj)) {
    return '';
  }
  const style = [];
  for (const key in obj) {
    let value = obj[key];
    if (value == null) {
      continue;
    }
    value = String(value).trim();
    if (value != '') {
      style.push(kebabCase(key) + ':' + value);
    }
  }
  return style.join(';');
}

export function getCurrentPage() {
  const pages = getCurrentPages();
  return pages[pages.length - 1];
}

export function heAlert(content, options) {
  const page = getCurrentPage();
  if (page && page.data._he_page) {
    options = options || {};
    options.content = content || options.content || '';
    page.data._he_page.showAlert(options)
  }
}
