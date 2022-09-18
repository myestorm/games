import Event from './Event.js';
import AlloyFinger from './AlloyFinger.js';

export default class Canvas extends Event {

  canvas = null; // 原始的canvas对象
  ctx = null; // CanvasRenderingContext2D
  shapes = []; // 所有的形状

  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas
   */
  constructor (canvas) {
    super();

    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.shapes = [];
    
    // 绑定事件
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
      .filter(shape => shape.isPointInRegion(myEvent.point)) // 先过滤掉不在范围内的形状
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
    if (typeof shape.draw !== 'function') {
      throw new Error('Shape need draw function');
    }
    // 绘制形状
    shape.draw(this.ctx);
    // 存储起来
    this.shapes.push(shape);
  }

  /**
   * 删除形状
   * @param {Shape} shape 
   */
   remove (shape) {
     const id = shape.id;
     const index = this.shapes.findIndex(shape => shape.id === id);
     if (index === -1) {
       return;
     }
     this.shapes.splice(index, 1);
    // 绘制形状
    this.shapes.map(shape => {
      shape.draw(this.ctx);
    });
  }

  /**
   * 清空形状
   */
  destory () {
    const width = this.canvas.width;
    const height = this.canvas.height;
    this.ctx.clearRect(0, 0, width, height);
    this.shapes = [];
  }
};
