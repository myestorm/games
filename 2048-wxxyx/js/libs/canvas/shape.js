import Event from './event';

export default class Shape extends Event {
  visible = true; // 可见的
  constructor () {
    super();
  }

  /**
   * @function
   * @name getDistancePoint
   * @description 计算两点之间的距离
   * @param {Object} point1 
   * @param {number} point1.x 
   * @param {number} point1.y 
   * @param {Object} point2 
   * @param {number} point2.x 
   * @param {number} point2.y 
   * @returns {number}
   */
  getDistancePoint (point1, point2) {
    const { x: x1, y: y1 } = point1;
    const { x: x2, y: y2 } = point2;

    return Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
  }

  // 必须要实现的方法
  // isPointInRegion 判断是否点击了当前对象
  // draw 画图方法
};
