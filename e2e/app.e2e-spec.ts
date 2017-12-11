import { element, by, browser } from 'protractor';
import { NavPage, HomePage, LoginPage, BetPage, MoneyPage } from './app.po';

describe('goldenbet App', () => {
  let homePage: HomePage;
  let loginPage: LoginPage;
  let betPage: BetPage;
  let moneyPage: MoneyPage;
  let navPage: NavPage;

  beforeEach(() => {
    homePage = new HomePage();
    loginPage = new LoginPage();
    betPage = new BetPage();
    moneyPage = new MoneyPage();
    navPage = new NavPage();
  });

  describe('login / logout', () => {
    it('contains a login link to navigate to the login page', () => {
      homePage.navigate();
      navPage.getNavItemsLoggedOut().login.click();
      expect(loginPage.getHeader().isPresent()).toBeTruthy();
    });

    it('returns to the previous page after login', async () => {
      homePage.navigate();
      navPage.getNavItemsLoggedOut().login.click();
      await loginPage.doLogin();
      browser.waitForAngular();
      expect(homePage.getHeader().isPresent()).toBeTruthy();
    });

    it('has a logout button after login', async () => {
      await loginPage.navigateAndLogin();
      browser.waitForAngular();
      expect(navPage.getNavItemsLoggedIn().logout).toBeDefined();
      await navPage.getNavItemsLoggedIn().logout.click();
      expect(navPage.getNavItemsLoggedIn().logout.isPresent()).toBeFalsy();
    });

    it('wont stay in a private page after logout', async () => {
      await loginPage.navigateAndLogin();
      await navPage.getNavItemsLoggedIn().bet.click();
      browser.waitForAngular();
      expect(betPage.getHeader().isPresent()).toBeTruthy();
      await navPage.getNavItemsLoggedIn().logout.click();
      browser.waitForAngular();
      expect(betPage.getHeader().isPresent()).toBeFalsy();
    });

    it('contains a link for betting in the home page after login', async () => {
      homePage.navigate();
      expect(homePage.page.betButton.isPresent()).toBeFalsy();
      navPage.getNavItemsLoggedOut().login.click();
      await loginPage.doLogin();
      browser.waitForAngular();
      expect(homePage.page.betButton.isPresent()).toBeTruthy();
    });
  });

  describe('adding money', () => {
    it('shouldnt navigate to addmoney if we are not logged in', () => {
      homePage.navigate();
      navPage.getNavItemsLoggedIn().addmoney.click();
      expect(loginPage.getHeader().isPresent()).toBeTruthy();
    });

    beforeEach(async () => {
      moneyPage.navigate();
      await loginPage.doLogin();
      browser.waitForAngular();
    });

    it('has a button to increase the money', async () => {
      expect(navPage.getCurrentCash()).toContain(0);
      await moneyPage.getCash();
      expect(navPage.getCurrentCash()).toContain(100);
    });
  });

  describe('betting', () => {
    it('shouldnt navigate to bet if we are not logged in', () => {
      homePage.navigate();
      navPage.getNavItemsLoggedIn().bet.click();
      expect(loginPage.getHeader().isPresent()).toBeTruthy();
    });

    describe('betting logged in', () => {
      beforeEach(async () => {
        homePage.navigate();
        await navPage.getNavItemsLoggedIn().bet.click();
        await loginPage.doLogin();
        browser.waitForAngular();
      });

      it('should navigate to bet if we are logged in', () => {
        expect(betPage.getHeader().isPresent()).toBeTruthy();
      });

      it('betting without cash redirects to add money page', async () => {
        expect(navPage.getCurrentCash()).toContain(0);
        await betPage.getButton(0).click();
        expect(moneyPage.getHeader().isPresent()).toBeTruthy();
      });

      describe('betting logged in with cash', () => {
        beforeEach(async () => {
          navPage.getNavItemsLoggedIn().addmoney.click();
          await moneyPage.getCash();
          navPage.getNavItemsLoggedIn().bet.click();
        });

        it('can place bets with money', async () => {
          expect(navPage.getCurrentCash()).toContain(100);
          await betPage.getButton(0).click();
          expect(betPage.getHeader().isPresent()).toBeTruthy();
          expect(navPage.getCurrentCash()).toContain(0);
        });

        it('disabled a button after betting', async () => {
          await betPage.getButton(0).click();
          expect(betPage.getButton(0).getAttribute('disabled')).toBeTruthy();
        });
      });
    });
  });
});
