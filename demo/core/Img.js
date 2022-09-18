import Shape from './Shape.js';

export default class Img extends Shape {
  /**
   * @constructor
   * @param {Object} props 参数
   * @param {Object} props.leftTop 顶点坐标，左上角的点的坐标
   * @param {number} props.leftTop.x x坐标
   * @param {number} props.leftTop.y y坐标
   * @param {number} props.width 宽
   * @param {number} props.height 高
   * @param {string} props.src 图片地址
   * @param {string} props.oWidth 原图宽度
   * @param {string} props.oHeight 原图高度
   */
  constructor (props) {
    super();
    this.config = props;

    let {
      leftTop,
      width,
      height,
      src,
      oWidth,
      oHeight
    } = this.config;
    const { x, y } = leftTop;

    this.img = new Image();
    this.img.src = src;

    this.width = width;
    this.height = height;

    if (!oWidth) {
      this.config.oWidth = oWidth = this.width;
    }

    if (!oHeight) {
      this.config.oHeight = oHeight = this.height;
    }

    this.x = x;
    this.y = y;
  }

  draw (ctx) {
    if (!this.visible) {
      return;
    }
    const {
      leftTop,
      width,
      height,
      oWidth,
      oHeight
    } = this.config;
    const { x, y } = leftTop;

    ctx.save();

    const imgRatio = oWidth / oHeight;
    const canvasRatio = width / height;
    let sw, sh, sx, sy;
    if (imgRatio <= canvasRatio){
      sw = oWidth;
      sh = sw / canvasRatio;
      sx = 0
      sy = (oHeight - sh) / 2
    } else {
      sh = oHeight;
      sw = sh * canvasRatio;
      sx = (oWidth - sw) / 2;
      sy = 0;
    } 
    ctx.drawImage(this.img, sx, sy, sw, sh, x, y, width, height);

    // ctx.drawImage(
    //   this.img,
    //   x,
    //   y,
    //   width,
    //   height
    // );

    ctx.restore(); 
  }
};
