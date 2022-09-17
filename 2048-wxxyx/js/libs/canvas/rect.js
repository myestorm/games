import Shape from './shape';

export default class Rect extends Shape {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {string} props.background 背景颜色
   * @param {number|number[]} props.borderRadius 圆角
   * @param {string} props.borderColor 边框颜色
   * @param {number} props.borderWidth 边框宽度
   */
  constructor (props) {
    super();
    this.config = props;
  }

  draw (ctx) {
    if (!this.visible) {
      return;
    }
    const { leftTop, width, height, background = '#000000', borderRadius = 0, borderColor = '#000000', borderWidth = 0 } = this.config;
    const { x, y } = leftTop;

    let { top, right, bottom, left } = [0, 0, 0, 0];
    if (Array.isArray(borderRadius)) {
      top = borderRadius[0]
      right = borderRadius[1]
      bottom = borderRadius[2]
      left = borderRadius[3]
    } else {
      top = right = bottom = left = borderRadius;
    }

    // 存储笔画状态
    ctx.save();

    ctx.beginPath();
    // 上弧线
    ctx.arc(x + top, y + top, top, 1 * Math.PI, 1.5 * Math.PI);
    // 上直线
    ctx.moveTo(x + top, y);
    ctx.lineTo(x + width - right, y);
    // 右弧线
    ctx.arc(x + width - right, y + right, right, 1.5 * Math.PI, 2 * Math.PI);
    // 右直线
    ctx.lineTo(x + width, y + right);
    ctx.lineTo(x + width, y + height - bottom);
    // 下弧线
    ctx.arc(x + width - bottom, y + height - bottom, bottom, 0 * Math.PI, 0.5 * Math.PI);
    // 下直线
    ctx.lineTo(x + width - bottom, y + height);
    ctx.lineTo(x + left, y + height);
    // 左弧线
    ctx.arc(x + left, y + height - left, left, 0.5 * Math.PI, 1 * Math.PI);
    // 左直线
    ctx.lineTo(x, y + height - left);
    ctx.lineTo(x, y + top);
    ctx.closePath();
    
    if (borderWidth > 0) {
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = borderWidth;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    ctx.fillStyle = background;
    ctx.fill();

    // 重置笔画
    ctx.restore(); 
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
