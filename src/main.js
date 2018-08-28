const module = Core.module('app.main');

module.run();

const AppRootElement = module.get('app.main.component.appRoot'),
      viewModel = module.get('app.main.model.view');

const appRootElement = AppRootElement;

document.body.appendChild(appRootElement);