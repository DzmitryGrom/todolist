(() => {

  ViewModelService.$inject = ['app.main.util.Emitter'];
  Core.module('app.main').service('app.main.model.view', ViewModelService);

  function ViewModelService(Emitter) {
    var self = this,
      mainViewNameEmitter = new Emitter(),
      mainViewName = null;

    self.setMainViewName = function (value) {
      mainViewName = value;
      mainViewNameEmitter.emit(value);
    };

    self.getMainViewName = function () {
      return mainViewName;
    }

    self.subscribeMainViewName = function (callback, immediateCall) {
      mainViewNameEmitter.subscribe(callback, immediateCall);
    }
  }
})();