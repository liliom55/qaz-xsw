import { LogistikappPage } from './app.po';

describe('logistikapp App', () => {
  let page: LogistikappPage;

  beforeEach(() => {
    page = new LogistikappPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
