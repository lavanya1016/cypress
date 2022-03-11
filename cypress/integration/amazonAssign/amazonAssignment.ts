import {
    RobotEyes,
    RobotHands,
    Dependencies,
  } from "../../amazon/amazon1/Robot";
  
  context("Search Test", () => {
    const robotEyes = new RobotEyes();
    const robotHands = new RobotHands();
    const dependencies = new Dependencies();
  
    describe("Search the required information", () => {
      before(() => {
        dependencies.visitAmazon();
        robotHands.clickSignIn();
      });
      it("Click Today's Deals", () => {
        robotHands.clickTodaysDeals();
      });
      it("Click Third Deal", () => {
        robotHands.clickThirdDeal();
        robotHands.clickThirdItem();
      });
      it("Click Add to Cart", () => {
        robotHands.clickAddToCart();
        robotHands.clickAddToCartContinue();
        robotHands.waitSeconds();
      });
      it("Search for Mobiles", () => {
        robotHands.searchForMobiles();
      });
      it("Scroll Down", () => {
        robotHands.scrollDown();
      });
      it("Get last displayed Item Details", () => {
        robotHands.clickLastDisplayedItem();
      });
      it("Check Amazon Prime CheckBox", () => {
        robotHands.selectPrime();
      });
      it("Check Delivery Status", () => {
        robotHands.clickSignIn();
        robotHands.checkDeliveryStatus();
      });
      it("Select Mobiles", () => {
        robotHands.clickMobiles();
      });
      it("Select Past 1 year Order", () => {
        robotHands.clickSignIn();
        robotHands.clickPastOrders();
      });
      it("Add New Address", () => {
        robotHands.addAddress();
      });
      it("Add Payment Details", () => {
        robotHands.addPayment();
        robotEyes.verifyPayment();
      });
    });
  });