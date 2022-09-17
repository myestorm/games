import Group from '../libs/canvas/group';
import Text from '../libs/canvas/text';
import Rect from '../libs/canvas/rect';

export default class Button extends Group {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {string} props.text 文本
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
      background: '#927963',
      borderRadius: 4
    });

    const label = new Text({
      leftTop: {
        x: 0,
        y: 0
      },
      width: this.config.width,
      height: this.config.height,
      fontSize: 16,
      fontFamily: fonts.Bold,
      color: '#ffffff',
      text: this.config.label
    });

    this.add(rect);
    this.add(label);
  }
};
