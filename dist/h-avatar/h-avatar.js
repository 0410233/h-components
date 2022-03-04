// components/h-avatar/h-avatar.js
Component({
  options: {
    multipleSlots: true,
  },

  /**
   * 组件的属性列表
   */
  properties: {
    user: Object,
    size: {
      type: Number,
      value: 56,
    },
    showSex: {
      type: Boolean,
      value: false,
    },
    showName: {
      type: Boolean,
      value: false,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    avatar: null,
    sexName: null,
    avatarSize: 'width:56rpx;height:56rpx',
  },

  lifetimes: {
    attached() {
      this.watchUser();
      this.computeSize();
    },
  },

  observers: {
    'user': function() {
      this.watchUser();
    },
    'size': function(size) {
      this.computeSize();
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    watchUser() {
      const user = this.properties.user || {};
      const sex = user.sex || 1;
      let avatar = user.avatar;
      if (!avatar) {
        avatar = '/images/placeholder-avatar-'+ (sex == 1 ? 'boy' : 'girl') +'.jpg';
      }
      this.setData({
        avatar: avatar,
        sexName: sex == 1 ? 'male' : 'female',
      });
    },

    computeSize() {
      const size = parseInt(this.properties.size);
      if (size) {
        this.setData({avatarSize: `width:${size}rpx;height:${size}rpx`});
      }
    },
  }
})
