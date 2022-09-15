import Group from '../libs/canvas/group';
import Image from '../libs/canvas/image';
import Rect from '../libs/canvas/rect';

export default class ToggleButton extends Group {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {boolean} props.status 状态
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

    const size = 24;
    this.onImage = new Image({
      leftTop: {
        x: (this.config.width - size) / 2,
        y: (this.config.height - size) / 2
      },
      width: size,
      height: size,
      src: 'images/icon/sound_on.png'
    });

    this.offImage = new Image({
      leftTop: {
        x: (this.config.width - size) / 2,
        y: (this.config.height - size) / 2
      },
      width: size,
      height: size,
      src: 'images/icon/sound_off.png'
    });

    this.setStatus(Boolean(this.config.status));
    this.add(rect);
    this.add(this.onImage);
    this.add(this.offImage);
  }


  setStatus (status) {
    this.config.status = Boolean(status);
    if (Boolean(this.config.status)) {
      this.onImage.visible = true;
      this.offImage.visible = false;
    } else {
      this.onImage.visible = false;
      this.offImage.visible = true;
    }
  }
};
