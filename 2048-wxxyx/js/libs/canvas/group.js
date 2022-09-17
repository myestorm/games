import Shape from './shape';

export default class Group extends Shape {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {string} props.background 背景颜色
   */
  constructor (props) {
    super();
    this.config = props;
    this.children = [];
  }

  draw (ctx) {
    if (!this.visible) {
      return;
    }
    const { leftTop, width, height, background = 'rgba(255,255,255,0)' } = this.config;
    const { x, y } = leftTop;

    ctx.save();
    ctx.fillStyle = background;
    ctx.fillRect(x, y, width, height);
    ctx.restore();

    this.children.map(shape => {
      shape.draw(ctx);
    });
  }

  add (shape) {
    // 将子组件的相对坐标转成绝对坐标
    const config = shape.config;
    const { x, y } = shape.config.leftTop;
    shape.config.leftTop.x = this.config.leftTop.x + x;
    shape.config.leftTop.y = this.config.leftTop.y + y;
    shape.config = {
      ...config
    };
    shape.parent = this.id;

    this.children.push(shape);
  }

  isPointInRegion (event) {
    const { x, y } = event.point;
    const { leftTop, width, height } = this.config;
    const { x: minX, y: minY } = leftTop;

    const maxX = minX + width;
    const maxY = minY + height;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return true
    }
    return false
  }
};
