let instance;

/**
 * 统一的音效管理器
 */
export default class Music {
  constructor (autoMusic) {
    if (instance) return instance;

    instance = this;

    this.bgmAudio = new Audio();
    this.bgmAudio.loop = true;
    this.bgmAudio.src = 'audio/bgm.mp3';

    this.dingAudio = new Audio();
    this.dingAudio.src = 'audio/ding.mp3';

    if (autoMusic) {
      this.playBgm();
    }
  }

  playBgm() {
    this.bgmAudio.play();
  }

  stopBgm() {
    this.bgmAudio.pause();
  }

  playDing() {
    this.dingAudio.currentTime = 0;
    this.dingAudio.play();
  }
}
