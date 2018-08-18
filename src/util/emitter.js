(function () {
  'use strict';

  EmitterFactory.$inject = [];
  Core.module('app.main').service('app.main.util.Emitter', EmitterFactory);

  function EmitterFactory() {
    function Emitter () {
      var self = this;

      self.lastValue = null;
      self.subscribers = [];
      self._hasEmit = false;


      self.emit = function (value) {
        self._hasEmit = true;
        self.lastValue = value;

        for (var i = 0; i < self.subscribers.length; i++) {
          self.subscribers[i](value);
        }
      };

      function subscribe (callback, immediateCall) {
        self.subscribers.push(callback);
        immediateCall = immediateCall === null || immediateCall === undefined ? true : immediateCall;
        if (immediateCall === true && self._hasEmit) {
          callback(self.lastValue);
        }
        return function unsubscribe () {
          for (var i = 0; i < self.subscribers.length; i++) {
            if (self.subscribers[i] === callback) {
              self.subscribers.splice(i, 1);
              return;
            }
          }
        };
      }

      self.subscribe = subscribe;
    }
    return Emitter;
  }
})();