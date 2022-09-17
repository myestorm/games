import Music from './runtime/music';
import DataBus from './databus';

import Canvas from './libs/canvas/canvas';

import Fonts from './ui/fonts';
import Background from './ui/background';
import Gameover from './ui/gameOver';
import GamePause from './ui/gamePause';
import Score from './ui/score';
import Button from './ui/button';
import ToggleButton from './ui/toggleButton';
import MainBody from './ui/mainBody';
import Footer from './ui/footer';

import Algorithm from './runtime/algorithm';

wx.setPreferredFramesPerSecond(24);

const algorithm = new Algorithm({
  col: 4,
  row: 4
});
const screenWidth = window.innerWidth;
const gap = 12;
const fixedGameOffset = window.fixedGameOffset = algorithm.computeOffsetTop();

const databus = new DataBus();
const music = new Music(databus.autoMusic);
const fonts = window.fonts = new Fonts();
const background = new Background();

const gamePause = new GamePause();
gamePause.on('tap', () => {
  if (databus.pause) {
    databus.pause = false;
  }
});

const gameOver = new Gameover();
gameOver.on('tap', () => {
  if (databus.gameOver) {
    databus.reset(algorithm.initData());
  }
});

const scoreWidth = (screenWidth - gap * 3) / 2;
const score = new Score({
  leftTop: {
    x: 12,
    y: 12 + fixedGameOffset
  },
  width: scoreWidth,
  height: 54,
  label: 'SCORE',
  score: databus.score
});
const best = new Score({
  leftTop: {
    x: scoreWidth + gap * 2,
    y: gap + fixedGameOffset
  },
  width: scoreWidth,
  height: 54,
  label: 'BEST',
  score: databus.best
});

const soundBtn = new ToggleButton({
  leftTop: {
    x: gap,
    y: 78 + fixedGameOffset
  },
  width: 48,
  height: 36,
  status: databus.autoMusic
});
soundBtn.on('tap', () => {
  const status = !soundBtn.config.status;
  soundBtn.setStatus(!soundBtn.config.status);
  if (status) {
    music.playBgm();
  } else {
    music.stopBgm();
  }
  databus.setStorageMusic(status);
});

const btnWidth = (screenWidth - 48 - gap * 4) / 2;
const pauseBtn = new Button({
  leftTop: {
    x: 48 + gap * 2,
    y: 78 + fixedGameOffset
  },
  width: btnWidth,
  height: 36,
  label: 'Pause Game',
});
pauseBtn.on('tap', () => {
  databus.pause = !databus.pause;
});
const newBtn = new Button({
  leftTop: {
    x: canvas.width - (gap + btnWidth),
    y: 78 + fixedGameOffset
  },
  width: btnWidth,
  height: 36,
  label: 'New Game',
});
newBtn.on('tap', () => {
  databus.reset(algorithm.initData());
});
const mainBody = new MainBody();

// let playing = false;
const eventHandler = (type) => {
  if (databus.pause || databus.gameOver) {
    return;
  }
  const data = algorithm[type](databus.gameData);
  databus.gameData = algorithm.randomData(data.result);
  databus.score += data.score;
  if (databus.score > databus.best) {
    databus.best = databus.score;
    databus.setStorageBest(databus.best);
  }
  // if (!playing && soundBtn.config.status) {
  //   playing = true;
  //   music.playDing();
  //   setTimeout(() => {
  //     playing = false;
  //   }, 300);
  // }
};
mainBody.on('swipeleft', () => {
  eventHandler('swipeleft')
});
mainBody.on('swiperight', () => {
  eventHandler('swiperight')
});
mainBody.on('swipeup', () => {
  eventHandler('swipeup')
});
mainBody.on('swipedown', () => {
  eventHandler('swipedown')
});
const footer = new Footer();

export default class Main {

  myCanvas = new Canvas(canvas);

  constructor () {
    this.aniId = 0;
    this.restart();
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render () {
    this.myCanvas.clear();
    this.myCanvas.ctx.font = `16px ${fonts.Bold}`;
    this.myCanvas.add(background);
    this.myCanvas.add(score);
    this.myCanvas.add(best);
    this.myCanvas.add(pauseBtn);
    this.myCanvas.add(newBtn);
    this.myCanvas.add(soundBtn);
    this.myCanvas.add(mainBody);
    this.myCanvas.add(gameOver);
    this.myCanvas.add(gamePause);
    this.myCanvas.add(footer);
  }

  // 游戏逻辑更新主函数
  update () {
    score.setScore(databus.score);
    best.setScore(databus.best);
    mainBody.setData(databus.gameData);
    databus.gameOver = algorithm.getGameOver(databus.gameData);
    gameOver.visible = databus.gameOver;
    gamePause.visible = databus.pause;
  }

  restart () {
    databus.reset(algorithm.initData());
    this.render();

    this.bindLoop = this.loop.bind(this);
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    );
  }

  // 实现游戏帧循环
  loop () {
    databus.frame++;

    this.update();
    this.render();

    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    );
  }
};
