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
    audio: null,
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

        // audio.offWaiting();
        // audio.onWaiting(() => {
        //   console.log('onWaiting')
        //   if (this.data.isPlaying) {
        //     console.log('onWaiting.pause')
        //     audio.pause();
        //   }
        // });

        // audio.offCanplay();
        // audio.onCanplay(() => {
        //   console.log('onCanplay')
        //   if (this.data.isPlaying) {
        //     console.log('onCanplay.play')
        //     audio.play();
        //   }
        // });

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
            audio.seek(0);
            this.setData({
              duration: audio.duration * 1000,
              audio: audio,
            });
            resolve(audio);
          }
        }, 100);
      });
    },

    destroy() {
      const audio = this.data.audio;
      if (audio) {
        audio.stop();
        audio.destroy();
        this.setData({audio: null})
      }
    },

    play() {
      const audio = this.data.audio;
      if (audio) {
        this.setData({isPlaying: true});
        audio.play();
      }
    },

    pause() {
      const audio = this.data.audio;
      if (audio) {
        this.setData({isPlaying: false});
        audio.pause();
      }
    },

    stop() {
      const audio = this.data.audio;
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
      const audio = this.data.audio;
      if (audio) {
        this.setData({currentTime: time});

        // const pause = () => {
        //   console.log('pause')
        //   audio.pause()
        // };
        // const play = () => {
        //   console.log('play')
        //   audio.offWaiting(pause);
        //   audio.offCanplay(play);
        //   audio.play();
        // };
        
        // audio.onCanplay(play);
        // audio.onWaiting(pause);
        
        // audio.seek(time / 1000);

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
      const audio = this.data.audio;
      if (audio && this.data.isPlaying) {
        audio.play();
      }
    },

    onProgressChanging(e) {
      // console.log('onProgressChanging', e)
      const audio = this.data.audio;
      if (audio) {
        audio.pause();
      }
      this.setData({currentTime: e.detail.value});
    },
  }
})
