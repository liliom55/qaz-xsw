import { browser, by, element } from 'protractor';

export class UdemyAngular4CoursePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }
}
