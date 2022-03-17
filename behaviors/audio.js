export default Behavior({
  /**
   * 组件的属性列表
   */
  properties: {
    src: String,
  },

  /**
   * 组件的初始数据
   */
  data: {
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    _audio: null,
  },

  observers: {
    'src': function(src) {
      if (! src) {
        return;
      }
      this.destroy();
      this.create(src);
    }
  },

  lifetimes: {
    detached() {
      this.destroy();
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {
    create(src) {
      return new Promise((resolve) => {
        wx.setInnerAudioOption({
          obeyMuteSwitch: false,
          fail: function(e) {
            console.log(e)
            wx.showToast({
              title: '静音设置失败',
              icon: 'error',
            });
          }
        });
        const audio = wx.createInnerAudioContext();
        audio.src = src;

        audio.onWaiting(() => {
          if (this.data.isPlaying) {
            audio.pause();
          }
        });

        audio.onCanplay(() => {
          if (this.data.isPlaying) {
            audio.play();
          }
        });

        audio.onTimeUpdate(() => {
          this.setData({
            currentTime: audio.currentTime * 1000,
          });
        });
  
        audio.onEnded(() => {
          this.stop();
        });
  
        const timer = setInterval(() => {
          if (audio.duration > 0) {
            clearInterval(timer);
            this.setData({
              duration: audio.duration * 1000,
              _audio: audio,
            });
            resolve(audio);
          }
        }, 100);
      });
    },

    destroy() {
      const audio = this.data._audio;
      if (audio) {
        audio.stop();
        audio.destroy();
        this.setData({audio: null})
      }
    },

    play() {
      if (this.data.isPlaying) {
        return;
      }
      this.setData({isPlaying: true});
      const audio = this.data._audio;
      if (audio) {
        audio.play();
      }
    },

    pause() {
      if (!this.data.isPlaying) {
        return;
      }
      this.setData({isPlaying: false});
      const audio = this.data._audio;
      if (audio) {
        audio.pause();
      }
    },

    stop() {
      const audio = this.data._audio;
      if (audio) {
        audio.stop();
      }
      this.setData({
        isPlaying: false,
      }, () => {
        this.seek(0);
      });
    },

    seek(time) {
      this.setData({currentTime: time});
      const audio = this.data._audio;
      if (audio) {
        audio.seek(time / 1000);
      }
    },

    togglePlay() {
      if (this.data.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    },

    onProgressChanged(e) {
      this.seek(e.detail.value);
    },

    onProgressChanging(e) {
      // console.log('onProgressChanging', e)
      const audio = this.data._audio;
      if (audio) {
        audio.pause();
      }
      this.setData({currentTime: e.detail.value});
    },
  }
})
