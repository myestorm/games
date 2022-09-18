import Event from './core/Event.js';
const event = new Event();
event.on('click', (event) => {
  console.log('click', event);
});
event.emit('click', { a: 1});