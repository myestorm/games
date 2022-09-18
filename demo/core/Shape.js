import Event from './Event.js';

export default class Shape extends Event {
  id = ''; // 唯一标识
  parent = ''; // 父级
  config = {}; // 配置参数
  visible = true; // 可见的

  constructor () {
    super();
    this.id = this.uuid();
    this.config = {
      width: 0,
      height: 0,
      leftTop: {
        x: 0,
        y: 0
      }
    };
  }

  /**
   * @function
   * @name uuid
   * @description 生成唯一ID
   * @returns {string}
   * @example ffb7cefd-02cb-4853-8238-c0292cf988d5
   */
  uuid () {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      const pos = Math.floor(Math.random() * 0x10);
      s[i] = hexDigits.substring(pos, pos + 1);
    }
    const pos = ((s[19] & 0x3) | 0x8);
    s[14] = '4'; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substring(pos, pos + 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-';

    const uuid = s.join('');
    return uuid;
  }

  /**
   * @function
   * @name getDistancePoints
   * @description 计算两点之间的距离
   * @param {Object} point1 
   * @param {number} point1.x 
   * @param {number} point1.y 
   * @param {Object} point2 
   * @param {number} point2.x 
   * @param {number} point2.y 
   * @returns {number}
   */
  getDistancePoints (point1, point2) {
    const { x: x1, y: y1 } = point1;
    const { x: x2, y: y2 } = point2;

    return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
  }

  /**
   * @function
   * @name isPointInRegion
   * @description 判断点是否在形状的范围内，默认是方形
   * @param {Object} point 
   * @param {number} point.x 
   * @param {number} point.y
   * @returns 
   */
  isPointInRegion (point) {
    const { x, y } = point;
    const { leftTop, width, height } = this.config;
    const { x: minX, y: minY } = leftTop;

    const maxX = minX + width;
    const maxY = minY + height;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
      return true;
    }
    return false;
  }

  /**
   * @function
   * @name isPointInCircle
   * @description 判断点是否在原型的范围内
   * @param {Object} point 点
   * @param {number} point.x 
   * @param {number} point.y
   * @param {Object} centre 圆心
   * @param {number} centre.x 
   * @param {number} centre.y
   * @param {number} radius 半径
   * @returns 
   */
  isPointInCircle (point, centre, radius) {
    // 计算点到圆心的距离
    const distance = this.getDistancePoint(point, centre);
    // 如果距离大于半径，则点不在圆形内，反之则在圆内
    return distance <= radius;
  }

};
