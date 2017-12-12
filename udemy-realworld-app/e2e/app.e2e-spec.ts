import { UdemyRealworldAppPage } from './app.po';

describe('udemy-realworld-app App', () => {
  let page: UdemyRealworldAppPage;

  beforeEach(() => {
    page = new UdemyRealworldAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
