import Group from '../libs/canvas/group';
import Text from '../libs/canvas/text';
import Rect from '../libs/canvas/rect';

export default class Score extends Group {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {string} props.label 说明
   * @param {string} props.score 分数
   */
   constructor (props) {
    super();
    this.config = props;

    const rect = new Rect({
      leftTop: {
        x: 0,
        y: 0
      },
      width: this.config.width,
      height: this.config.height,
      background: '#bdad9e',
      borderRadius: 4
    });

    const label = new Text({
      leftTop: {
        x: 0,
        y: 0
      },
      width: this.config.width,
      height: 24,
      // font: `14px ${fonts.Bold}`,
      fontSize: 14,
      fontFamily: fonts.Bold,
      color: '#f0e4d9',
      text: this.config.label
    });

    const value = new Text({
      leftTop: {
        x: 0,
        y: 24
      },
      width: this.config.width,
      height: this.config.height - 24,
      // font: `24px ${fonts.Bold}`,
      fontSize: 24,
      fontFamily: fonts.Bold,
      color: '#ffffff',
      text: this.config.score
    });

    this.add(rect);
    this.add(label);
    this.add(value);

    this.valueShape = value;
  }

  setScore (score) {
    this.config.score = this.valueShape.config.text = score;
  }
};
