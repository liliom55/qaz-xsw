import { UdemyAngular4TestPage } from './app.po';

describe('udemy-angular4-test App', () => {
  let page: UdemyAngular4TestPage;

  beforeEach(() => {
    page = new UdemyAngular4TestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
