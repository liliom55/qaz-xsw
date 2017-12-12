import { IntegrationTestingPage } from './app.po';

describe('integration-testing App', () => {
  let page: IntegrationTestingPage;

  beforeEach(() => {
    page = new IntegrationTestingPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
