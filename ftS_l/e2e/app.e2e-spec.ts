import { FitStandSimonsPage } from './app.po';

describe('fit-stand-simons App', () => {
  let page: FitStandSimonsPage;

  beforeEach(() => {
    page = new FitStandSimonsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
