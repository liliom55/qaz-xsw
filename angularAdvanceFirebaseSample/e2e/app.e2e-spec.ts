import { AngularFirebaseSamplePage } from './app.po';

describe('angular-firebase-sample App', () => {
  let page: AngularFirebaseSamplePage;

  beforeEach(() => {
    page = new AngularFirebaseSamplePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
