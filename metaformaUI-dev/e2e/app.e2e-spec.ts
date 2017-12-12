import { Ng4testPage } from './app.po';

describe('ng4test App', () => {
  let page: Ng4testPage;

  beforeEach(() => {
    page = new Ng4testPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
