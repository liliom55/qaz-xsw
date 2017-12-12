import { FitConnectDevelopmentAppPage } from './app.po';

describe('fit-connect-development-app App', () => {
  let page: FitConnectDevelopmentAppPage;

  beforeEach(() => {
    page = new FitConnectDevelopmentAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
