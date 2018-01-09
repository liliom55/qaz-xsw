import { FitassistantPage } from './app.po';

describe('fitassistant App', () => {
  let page: FitassistantPage;

  beforeEach(() => {
    page = new FitassistantPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
