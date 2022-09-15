import Shape from './shape';

export default class Circle extends Shape {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.centre 圆心
   * @param {number} props.centre.x x坐标
   * @param {number} props.centre.y y坐标
   * @param {number} props.radius 半径
   * @param {string} props.fillColor 填充颜色
   */
  constructor (props) {
    super();
    this.config = props;
  }

  /**
   * @function
   * @name draw
   * @description render to canvas
   * @param {CanvasRenderingContext2D} ctx canvas 2D content
   * @return void
   */
  draw (ctx) {
    const { centre, radius, fillColor = '#000000' } = this.config;
    const { x, y } = centre;

    ctx.save();

    ctx.beginPath();
    ctx.fillStyle = fillColor;
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();

    ctx.restore();
  }

  isPointInRegion (event) {
    const { point } = event;
    const { centre, radius } = this.config;

    // 计算点到圆心的距离
    const distance = this.getDistancePoint(point, centre);
    // 如果距离大于半径，则点不在圆形内，反之则在圆内
    return distance <= radius;
  }
};
