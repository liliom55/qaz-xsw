import { browser, by, element } from 'protractor';

export class UdemyAngular4TestPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
