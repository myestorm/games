import Pool from './base/pool'

let instance

const storageBest = 'BEST';
const storageMusic = 'MUSIC';
/**
 * 全局状态管理器
 */
export default class DataBus {
  constructor () {
    if (instance) return instance

    instance = this

    this.pool = new Pool()

    this.reset()
  }

  reset (gameData) {
    this.frame = 0;
    this.score = 0;
    this.best = wx.getStorageSync(storageBest) || 0;
    this.autoMusic = wx.getStorageSync(storageMusic) === '' ? true : Boolean(wx.getStorageSync(storageMusic));
    this.gameData = gameData;
    this.pause = false;
    this.gameOver = false;
  }

  setStorageBest (score) {
    wx.setStorage({
      key: storageBest,
      data: score
    });
  }

  setStorageMusic (value) {
    wx.setStorage({
      key: storageMusic,
      data: value
    });
  }

}
