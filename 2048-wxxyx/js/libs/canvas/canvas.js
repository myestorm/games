import Event from './event';
import AlloyFinger from './alloyFinger';

export default class Canvas extends Event {
  canvas = null;
  ctx = null;
  shapes = [];

  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas
   */
  constructor (canvas) {
    super();

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.shapes = [];

    this.bindEvents();
  }

  /**
   * @function
   * @name bindEvents
   * @description 绑定默认事件
   * @return void
   */
  bindEvents () {
    new AlloyFinger(this.canvas, {
      tap: (event) => {
        this.handleEvent('tap')(event);
      },
      swipe: (event) => {
        this.handleEvent('swipe' + event.direction.toLowerCase())(event);
      }
    })
  }

  /**
   * @function
   * @name newEvent
   * @description 在默认的event对象上添加一些新的属性
   * @return {Object}
   * @example
   * newEvent(event)
   * =>
   * { point: {x: 0, y: 0}, _oriEvent: event }
   */
  newEvent (event) {
    const touches = event.changedTouches;
    const point = {
      x: event.offsetX || touches[0].clientX,
      y: event.offsetY || touches[0].clientY
    };
    return {
      point,
      _oriEvent: event
    };
  }

  /**
   * 分发事件
   * @param {string} name 事件名称
   * @returns {(event) => {}}
   */
  handleEvent = (name) => (event) => {
    const touches = event.changedTouches;
    if (touches.length === 0) {
      return;
    }
    const myEvent = this.newEvent(event);
    this.shapes
      .filter(shape => shape.isPointInRegion(myEvent)) // 先过滤掉不在范围内的形状
      .map(shape => {
        shape.emit(name, myEvent)
      }); // 向下分发事件
    this.emit(name, myEvent); // canvas的事件
  }

  /**
   * 添加形状
   * @param {Shape} shape 
   */
  add (shape) {
    shape.draw(this.ctx);
    this.shapes.push(shape);
  }

  clear () {
    this.shapes = [];
  }
};
