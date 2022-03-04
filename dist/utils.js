let systemInfo = null;
function getSystemInfo() {
  if (systemInfo == null) {
    systemInfo = wx.getSystemInfoSync(); 
  } else {
    console.log('systemInfo is not null');
  }
  return systemInfo;
}

let menuBtnRect = null;
function getMenuButtonRect() {
  if (menuBtnRect == null) {
    menuBtnRect = wx.getMenuButtonBoundingClientRect(); 
  } else {
    console.log('menuBtnRect is not null');
  }
  return menuBtnRect;
}

const navbarPaddingBottom = 8;
function getNavBarHeight() {
  return getMenuButtonRect().bottom + navbarPaddingBottom;
}

function getNavBarPadding() {
  const sysinfo = getSystemInfo();
  const rect = getMenuButtonRect();
  return {
    top: rect.top,
    bottom: navbarPaddingBottom,
    left: sysinfo.screenWidth - rect.right,
    right: sysinfo.screenWidth - rect.right,
  };
}

function getSafeAreaInsetBottom() {
  const sysinfo = getSystemInfo();
  return sysinfo.screenHeight - sysinfo.safeArea.bottom;
}

function getRect(context, selector) {
  return new Promise(function (resolve) {
    wx.createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect(resolve)
      .exec();
  });
}

function getAllRect(context, selector) {
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
const formatCssSize = (val, def = '0') => {
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
};

/**
 * 格式化尺寸 'w h' => [width, height]
 * @param {string|number} size 
 */
const formatIconSize = size => {
  if (!size || size == 0) {
    return ['0', '0'];
  }
  size = String(size).split(' ');
  const width = size[0] || 0;
  const height = size[1] || width;
  return [formatCssSize(width), formatCssSize(height)];
};

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export {
  getSystemInfo,
  getMenuButtonRect,
  getNavBarHeight,
  getNavBarPadding,
  getSafeAreaInsetBottom,

  getRect,
  getAllRect,
  formatNumber,
  formatCssSize,
  formatIconSize,
}
