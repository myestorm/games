import DataBus from './databus';

import Canvas from './libs/canvas/canvas';
import Rect from './libs/canvas/rect';

import Fonts from './ui/fonts';
import Background from './ui/background';
import Score from './ui/score';
import Button from './ui/button';
import ToggleButton from './ui/toggleButton';
import MainBody from './ui/mainBody';
import Footer from './ui/footer';

const databus = new DataBus();

const fonts = window.fonts = new Fonts();
const background = new Background();
const score = new Score({
  leftTop: {
    x: 12,
    y: 12
  },
  width: 120,
  height: 54,
  label: 'SCORE',
  score: 27368
});
const best = new Score({
  leftTop: {
    x: 144,
    y: 12
  },
  width: 120,
  height: 54,
  label: 'BEST',
  score: 27368
});
const soundBtn = new ToggleButton({
  leftTop: {
    x: 12,
    y: 78
  },
  width: 48,
  height: 36,
  status: false
});
const pauseBtn = new Button({
  leftTop: {
    x: 72,
    y: 78
  },
  width: 152,
  height: 36,
  label: 'Pause Game',
});
const newBtn = new Button({
  leftTop: {
    x: canvas.width - (12 + 128),
    y: 78
  },
  width: 128,
  height: 36,
  label: 'New Game',
});
const mainBody = new MainBody();
const footer = new Footer();

export default class Main {

  constructor () {
    this.aniId = 0;
    this.restart();
  }

  /**
   * canvas重绘函数
   * 每一帧重新绘制所有的需要展示的元素
   */
  render () {
    if (this.myCanvas) {
      this.myCanvas.clear();
    }
    this.myCanvas = new Canvas(canvas);
    this.myCanvas.ctx.font = `16px ${fonts.Bold}`;
    this.myCanvas.add(background);
    // score.setScore(databus.frame);
    this.myCanvas.add(score);
    this.myCanvas.add(best);
    this.myCanvas.add(pauseBtn);
    this.myCanvas.add(newBtn);
    soundBtn.setStatus(true);
    this.myCanvas.add(soundBtn);
    this.myCanvas.add(mainBody);
    this.myCanvas.add(footer);


    // this.bg.render(ctx);
    // this.myCanvas.ctx.fillText('Hello Canvas World! 中文', 60, 200);
  }

  // 游戏逻辑更新主函数
  update () {

  }

  restart () {
    databus.reset();
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
