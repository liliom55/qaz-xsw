import { UdemyAngular4CoursePage } from './app.po';

describe('udemy-angular4-course App', () => {
  let page: UdemyAngular4CoursePage;

  beforeEach(() => {
    page = new UdemyAngular4CoursePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
