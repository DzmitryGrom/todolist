(() => {
  const module = Core.module('app.main');

  module.run();

  const AppRootElement = module.get('app.main.component.appRoot');

  const appRootElement = AppRootElement;

  document.body.appendChild(appRootElement);
})();