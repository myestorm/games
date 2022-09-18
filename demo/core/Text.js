import Shape from './Shape.js';

// 单行文本
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
   * @param {string} props.fontWeight 字重
   * @param {string} props.color 颜色
   * @param {string} props.textAlign 对齐方式
   * @param {string} props.textBaseline 基线对齐防线
   * @param {string} props.direction 文本方向
   * @param {string} props.text 文本
   */
  constructor (props) {
    super();
    this.config = Object.assign({}, this.config, props || {});
  }

  draw (ctx) {
    if (!this.visible) {
      return;
    }
    const {
      leftTop,
      width = 0,
      height = 0,
      fontSize = 16,
      fontFamily = 'Roboto',
      fontWeight = '',
      color = '#000000',
      textAlign = 'center',
      textBaseline = 'middle',
      direction = 'ltr',
      text = ''
    } = this.config;
    let { x, y } = leftTop;

    ctx.save();

    ctx.font = `normal ${fontWeight} ${fontSize}px ${fontFamily}`;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.direction = direction;

    // 计算文本的宽度和高度，小程序不支持
    // const metrics = ctx.measureText(text);
    // const fontHeight = metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;

    // 使用固定算法，字号的1.2倍
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
};
