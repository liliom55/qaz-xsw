import { TestThreeJsPage } from './app.po';

describe('test-three-js App', () => {
  let page: TestThreeJsPage;

  beforeEach(() => {
    page = new TestThreeJsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
