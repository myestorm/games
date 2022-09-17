import Shape from './shape';

export default class Text extends Shape {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {number} props.fontSize 字号
   * @param {string} props.fontFamily 字体
   * @param {string} props.color 颜色
   * @param {string} props.textAlign 对齐方式
   * @param {string} props.textBaseline 基线对齐防线
   * @param {string} props.direction 文本方向
   * @param {string} props.text 文本
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
    const { leftTop, width = 0, height = 0, fontSize = 16, fontFamily = 'Roboto', color = '#000000', textAlign = 'center', textBaseline = 'middle', direction = 'ltr', text = '' } = this.config;
    let { x, y } = leftTop;

    ctx.save();

    // ctx.font = `normal bold ${fontSize}px ${fontFamily}`;
    ctx.font = `normal bold ${fontSize}px ${fontFamily}`;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.direction = direction;

    // const metrics = ctx.measureText(text);
    // const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

    const metrics = {
      width: (text.length || 0) * (fontSize * 1.2)
    };
    const fontHeight = Math.floor(fontSize * 1.2);

    if (textAlign === 'center') {
      x = x + (width - metrics.width) / 2 + metrics.width / 2;
      y = y + (height - fontHeight) / 2 + fontHeight / 2;
    }
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);

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
