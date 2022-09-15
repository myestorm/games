import Event from './event';
import Hammer from './hammer'

const eventList = [
  'tap',
  'doubletap',
  'swipe',
  'swipeleft',
  'swiperight',
  'swipeup',
  'swipedown',
];

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

    const hammer = new Hammer(canvas);
    hammer.on('doubletap', function(ev) {
      console.log('doubletap', ev);
    });

    this.bindEvents();
  }

  /**
   * @function
   * @name bindEvents
   * @description 绑定默认事件
   * @return void
   */
  bindEvents () {
    // eventList.map(eventName => {
    //   this.canvas.addEventListener(eventName, this.handleEvent(eventName));
    // });
    const hammer = new Hammer(this.canvas);
    eventList.map(eventName => {
      hammer.on(eventName, this.handleEvent(eventName));
      return eventName;
    });
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
    const point = {
      x: event.offsetX || event.pointers[0].clientX,
      y: event.offsetY || event.pointers[0].clientY
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
    const pointers = event.pointers;
    if (pointers.length === 0) {
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
