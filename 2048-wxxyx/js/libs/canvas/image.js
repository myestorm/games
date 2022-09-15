import Shape from './shape';

export default class CanvasImage extends Shape {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {string} props.src 图片地址
   */
  constructor (props) {
    super();
    this.config = props;

    const { leftTop, width, height, src } = this.config;
    const { x, y } = leftTop;

    this.img = new Image();
    this.img.src = src;

    this.width = width;
    this.height = height;

    this.x = x;
    this.y = y;
  }

  draw (ctx) {
    if (!this.visible) {
      return;
    }
    const { leftTop, width, height } = this.config;
    const { x, y } = leftTop;

    ctx.save();

    ctx.drawImage(
      this.img,
      x,
      y,
      width,
      height
    );

    ctx.restore(); 
  }

  isPointInRegion (event) {
    const { x, y } = event.point;
    const { leftTop, width, height } = this.config;
    const { x: minX, y: minY } = leftTop;

    const maxX = minX + width;
    const maxY = minY + height;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return true;
    }
    return false;
  }
};
