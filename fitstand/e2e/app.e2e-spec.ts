import { FitstandPage } from './app.po';

describe('fitstand App', () => {
  let page: FitstandPage;

  beforeEach(() => {
    page = new FitstandPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
