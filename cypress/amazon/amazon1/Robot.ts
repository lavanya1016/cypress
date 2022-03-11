import { BaseHands, BaseEyes, BaseDependencies } from "../BaseRobot";

export class Dependencies extends BaseDependencies {
  visitAmazon() {
    cy.fixture("amazon.json").then((user) => {
      cy.visit(user.url);
    });
  }
}

export class RobotEyes extends BaseEyes {
  verifyPayment() {
    cy.fixture("amazon.json").then((user) => {
      this.seesTextWithClass("a-row.pmts-account-holder-name", user.cardName);
    });
  }
}

export class RobotHands extends BaseHands {
  searchForMobiles() {
    cy.fixture("amazon.json").then((user) => {
      this.typeTextonDom(
        "id",
        "twotabsearchtextbox",
        "Mobiles"
      ).clickOnDomElement(user.submitButton);
    });
  }
  clickTodaysDeals() {
    this.clickDomElementUsingContains("See all deals");
  }
  addAddress() {
    cy.fixture("amazon.json").then((user) => {
      this.clickOnDomElement(user.accountLink);
      this.clickOnDomElement(user.addressLink);

      cy.get("#ap_email").type(user.email);
      this.clickOnDomElement(user.continueLink);
      cy.get("#ap_password").type(user.password);
      this.clickOnDomElement(user.signInButton);
      this.clickOnDomElement(user.addAddressIcon);
      this.typeTextonId("address-ui-widgets-enterAddressFullName", user.name);
      this.typeTextonId(
        "address-ui-widgets-enterAddressPhoneNumber",
        user.phone
      );
      this.typeTextonId(
        "address-ui-widgets-enterAddressPostalCode",
        user.pincode
      );
      this.typeTextonId("address-ui-widgets-enterAddressLine1", user.addLine1);
      this.typeTextonId("address-ui-widgets-enterAddressLine2", user.addLine2);
      this.typeTextonId("address-ui-widgets-enterAddressCity", user.city);

      this.clickOnId("address-ui-widgets-enterAddressStateOrRegion");
      this.clickOnId(user.stateDropDown);
      this.clickOnDomElement(user.addressButton);
    });
  }
  addPayment() {
    cy.fixture("amazon.json").then((user) => {
      this.clickOnDomElement(user.accountLink);
      this.clickOnDomElement(user.addPaymentLink);
      this.typeTextonDom("id", "ap_email", user.email);
      this.clickOnDomElement(user.continueLink);
      this.typeTextonDom("id", "ap_password", user.password);
      this.clickOnDomElement(user.signInButton);
      this.clickOnDomElement(user.expandPaymentDetails);
    });
  }
  clickThirdDeal() {
    cy.fixture("amazon.json").then((user) => {
      this.clickOnDomElement(user.thirdDealLink);
    });
  }
  clickThirdItem() {
    cy.fixture("amazon.json").then((user) => {
      this.clickOnDomElement(user.thirdDealItem);
    });
  }
  clickLastDisplayedItem() {
    cy.fixture("amazon.json").then((user) => {
      this.clickOnDomElementInSameTab(user.lastItemUrl);
    });
  }
  scrollDown() {
    this.scrollBottom();
  }
  clickAddToCart() {
    cy.fixture("amazon.json").then((user) => {
      this.clickOnDomElement(user.addToCartButton);
    });
  }
  clickAddToCartContinue() {
    cy.fixture("amazon.json").then((user) => {
      this.clickOnDomElement(user.continueImage);
    });
  }
  checkDeliveryStatus() {
    cy.fixture("amazon.json").then((user) => {
      this.clickOnDomElement(user.ordersLink);
    });
  }
  clickSignIn() {
    cy.fixture("amazon.json").then((user) => {
    this.clickOnDomElement(user.signInLink);
      cy.get("#ap_email").type(user.email);
      this.clickOnDomElement(user.continueLink);
      cy.get("#ap_password").type(user.password);
      this.clickOnDomElement(user.signInButton);
    });
    
  }

  clickMobiles() {
    cy.fixture("amazon.json").then((user) => {
    this.clickOnHrefElement("Mobiles");
    this.clickOnDomElement(user.mobileLink);
  });
  }
  selectPrime() {
    cy.fixture("amazon.json").then((user) => {
    this.clickOnHrefElement("Mobiles");
    this.clickOnDomElement(user.primeLink);
    this.clickOnDomElementInSameTab(user.primeElementUrl);
    });
  }
  clickPastOrders() {
    cy.fixture("amazon.json").then((user) => {
    this.clickOnDomElement(user.ordersLink);
    this.clickOnDomElement(user.ordersDropdown);
    this.clickOnDomElement(user.ordersOption);
  });
  }

  waitSeconds() {
    this.wait(5000);
  }
}