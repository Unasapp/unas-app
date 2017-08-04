import { UnasAppPage } from './app.po';

describe('unas-app App', () => {
  let page: UnasAppPage;

  beforeEach(() => {
    page = new UnasAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
