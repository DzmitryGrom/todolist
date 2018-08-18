(function(global) {
  'use strict';

  const Core = {},
    modules = {};

  global.Core = Core;

  Core.module = function(name) {
    let result;

    if (modules[name]) {
      result = modules[name];
    } else {
      result = modules[name] = new Module(name);
    }

    return result;
  };

  function Module(name) {
    const self = this,
      beans = {},
      modules = [];

    let isRunning = false,
      factoryData = [],
      pushFactoryData = pushFactoryDataHelper(factoryData);

    self.run = function() {
      if (isRunning) {
        return;
      }

      modules.forEach(function(module) {
        module.run();
      });

      createBeans(factoryData, beans);

      factoryData = null;
      pushFactoryData = null;

      isRunning = true;
    };

    self.name = function() {
      return name;
    };

    self.import = function(moduleName) {
      modules.push(Core.module(moduleName));
    };

    self.constant = function(name, value) {
      beans[name] = isFunction(value) ? value() : value;
    };

    self.service = function(name, constructor) {
      if (!isRunning) {
        pushFactoryData(name, serviceBuild(constructor), constructor.$inject);
      } else {
        createBean(getFactoryItem(name, serviceBuild(constructor), constructor.$inject), beans);
      }
    };

    self.factory = function(name, constructor) {
      if (!isRunning) {
        pushFactoryData(name, constructor, constructor.$inject);
      } else {
        createBean(getFactoryItem(name, constructor, constructor.$inject), beans);
      }
    };

    self.component = self.factory;

    self.get = function(name) {
      let result = self._get(name);

      if (!result) {
        throw Error('been name:' + name + ' not found for:' + self.name());
      }

      return result;
    };

    self._get = function(name) {
      let result;

      if (name in beans) {
        result = beans[name];
      }

      for (let index = 0; index < modules.length && !result; index++) {
        result = modules[index]._get(name);
      }

      return result;
    };


    function pushFactoryDataHelper(destination) {
      return function(name, build, dependences) {
        destination.push(getFactoryItem(name, build, dependences))
      };
    }

    function getFactoryItem(name, build, dependences) {
      return {
        name,
        build,
        dependences: dependences || []
      };
    }

    function serviceBuild(constructor) {
      return function() {
        function Service(args) {
          return constructor.apply(this, args);
        }

        Service.prototype = constructor.prototype;

        return new Service(arguments);
      }
    }

    function createBeans(factoryData, destination) {
      factoryData = sort(factoryData, factroryItemDependent);

      factoryData.forEach(function(item) {
        createBean(item, destination);
      });
    }

    function createBean(factoryItem, destination) {
      let dependences = factoryItem.dependences.map(self.get);

      destination[factoryItem.name] = factoryItem.build.apply(null, dependences);
    }

    function isFunction(value) {
      return typeof value === 'function';
    }

    function factroryItemDependent(a, b) {
      return a.dependences.indexOf(b.name) !== -1;
    }

    function sort(originalArray, comparator) {
      const array = [...originalArray];

      while (true) {
        let swap = false;

        for (let i = 0; i < array.length; i += 1) {
          let j = 1 + i;
          for (; j < array.length; j += 1) {
            if (comparator(array[i], array[j])) {
              const tmp = array[i];
              array[i] = array[j];
              array[j] = tmp;

              swap = true;

              break;
            }
          }
        }

        if (!swap) {
          break;
        }
      }

      return array;
    }
  }

})(typeof module !== 'undefined' ? module.exports : window);