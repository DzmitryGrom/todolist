const module = Core.module('app.main');

module.run();

const AppRootElement = module.get('app.main.component.appRoot'),
      viewModel = module.get('app.main.model.view'),
      calendarModel = module.get('app.main.model.calendar');

const appRootElement = new AppRootElement();

document.body.appendChild(appRootElement);