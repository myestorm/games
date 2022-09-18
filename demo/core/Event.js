export default class Event {

  _listener = null;

  constructor () {
    this._listener = new Map();
  }

  on (eventName, listener) {
    if (this._listener.has(eventName)) {
      this._listener.get(eventName)?.push(listener);
    } else {
      this._listener.set(eventName, [listener]);
    }
  }

  off (eventName, listener) {
    if (!listener) {
      this._listener.set(eventName, []);
      return;
    }
    if (this._listener.get(eventName)) {
      const listeners = this._listener.get(eventName) || [];
      for (let i = 0, len = listeners.length; i < len; i++) {
        if (listeners[i] === listener) {
          listeners.splice(i, 1);
        }
      }
    }
  }

  emit (eventName, event) {
    if (!eventName) {
      return;
    }
    const listeners = this._listener.get(eventName);
    if (!listeners) {
      return;
    }
    for (let index = 0; index < listeners.length; index++) {
      const handler = listeners[index];
      handler(event);
    }
  }
};
