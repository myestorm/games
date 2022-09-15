import BaseScore from '../base/score';

export default class Score extends BaseScore {
  constructor(ctx) {
    super(0, 'SCORE', ((canvas.width - (8*2) - 32)) / 2);
    this.render(ctx);
  }

  render(ctx) {
    ctx.fillText('Hello Canvas World! 中文', 60, 200);
  }
};
