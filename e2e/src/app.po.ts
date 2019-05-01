import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
<<<<<<< HEAD
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
=======
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText();
>>>>>>> e41ee4ab29552ac61e451d643d51a6239d86b8c6
  }
}
