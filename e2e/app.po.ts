import { browser, by, element } from 'protractor';

export class NavPage {
  page;

  constructor() {
    this.page = this.getNavStruct();
  }

  private getNavStruct() {
    const navItems = element.all(by.css('.nav-item'));

    return {
      navItemsLoggedOut: {
        home: navItems.get(0),
        bet: navItems.get(1),
        login: navItems.get(2)
      },
      navItemsLoggedIn: {
        home: navItems.get(0),
        bet: navItems.get(1),
        addmoney: navItems.get(2),
        logout: navItems.get(3),
        cash: navItems.get(4)
      }
    };
  }

  getNavItemsLoggedIn() {
    return this.page.navItemsLoggedIn;
  }

  getNavItemsLoggedOut() {
    return this.page.navItemsLoggedOut;
  }

  getCurrentCash() {
    return this.page.navItemsLoggedIn.cash.getText();
  }
}

export class HomePage {
  page;

  constructor() {
    this.page = this.getPageStruct();
  }

  private getPageStruct() {
    return {
      header: element(by.css('app-home h1')),
      betButton: element(by.buttonText('Start betting'))
    };
  }

  navigate() {
    return browser.get('/');
  }

  getHeader() {
    return this.page.header;
  }
}

export class LoginPage {
  page;

  constructor() {
    this.page = this.getPageStruct();
  }

  private getPageStruct() {
    return {
      header: element(by.css('app-login h2')),
      inputEmail: element(by.css('app-login #inputEmail')),
      inputPassword: element(by.css('app-login #inputPassword')),
      submitButton: element(by.buttonText('Sign in'))
    };
  }

  navigate() {
    return browser.get('/login');
  }

  async navigateAndLogin() {
    this.navigate();
    await this.doLogin();
  }

  getHeader() {
    return this.page.header;
  }

  async doLogin() {
    await this.page.inputEmail.sendKeys('jesus@perro.com');
    await this.page.inputPassword.sendKeys('1234');
    this.page.submitButton.click();
  }
}

export class BetPage {
  page;

  constructor() {
    this.page = this.getPageStruct();
  }

  navigate() {
    return browser.get('/bet');
  }

  private getPageStruct() {
    return {
      header: element(by.css('app-bet h1')),
      betButton: element.all(by.buttonText('Bet'))
    };
  }

  getHeader() {
    return this.page.header;
  }

  getButton(index: number) {
    return this.page.betButton.get(index);
  }
}

export class MoneyPage {
  page;

  constructor() {
    this.page = this.getPageStruct();
  }

  private getPageStruct() {
    return {
      header: element(by.css('app-addmoney h1')),
      getCashButton: element(by.buttonText('Give me money'))
    };
  }

  navigate() {
    return browser.get('/addmoney');
  }

  getHeader() {
    return this.page.header;
  }

  getCash() {
    return this.page.getCashButton.click();
  }
}
