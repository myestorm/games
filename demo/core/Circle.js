import Shape from './Shape.js';

export default class Circle extends Shape {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.centre 圆心
   * @param {number} props.centre.x x坐标
   * @param {number} props.centre.y y坐标
   * @param {number} props.radius 半径
   * @param {string} props.fillColor 填充颜色
   * @param {string} props.borderColor 边框颜色
   * @param {number} props.borderWidth 边框宽度
   */
  constructor (props) {
    super();
    this.config = Object.assign({}, this.config, props || {});
  }

  /**
   * @function
   * @name draw
   * @description render to canvas
   * @param {CanvasRenderingContext2D} ctx canvas 2D content
   * @return void
   */
  draw (ctx) {
    if (!this.visible) {
      return;
    }
    const {
      centre,
      radius,
      fillColor = '#000000',
      borderColor = '#000000',
      borderWidth = 0
    } = this.config;
    const { x, y } = centre;

    ctx.save();

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    
    if (borderWidth > 0) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
    }
    ctx.fillStyle = fillColor;
    ctx.fill();

    ctx.restore();
  }

  /**
   * @function
   * @name isPointInRegion
   * @description 覆写默认判断范围方法，由方形变成圆形
   * @param {Object} point 
   * @param {number} point.x 
   * @param {number} point.y
   * @returns 
   */
  isPointInRegion (point) {
    const { centre, radius } = this.config;
    return this.isPointInCircle(point, centre, radius);
  }
};
