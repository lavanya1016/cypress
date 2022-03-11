/// <reference types="cypress" />
import {
    RobotEyes,
    RobotHands,
    Dependencies
  } from "../../amazon/robot"
  //context("Search Test", () => {
  const dependencies = new Dependencies();
  const robotEyes = new RobotEyes();
  const robotHands = new RobotHands();
  
  //Handling exceptions using Cypress
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  describe('SIGN INTO AMAZON->ADD PAYMENT METHOD->ADD ADDRESS->AVAIL PRIME DELIVERY OPTION', () => {
    // Function to open amazon and sign in with credentials
    beforeEach('TEST 5: Open amazon and Sign in', () => {
      dependencies.visitAmazon();
      //Locate sign in button and clicking sign in
      robotEyes.findSignInOption('nav-link-accountList .nav-line-2', 'Account & Lists\n  ');
      cy.wait(2000)
      robotHands.clickSignIn('#nav-link-accountList .nav-line-2')
      cy.wait(2000)
  
      //Feed sign in credential username and assert that its not empty and continue 
      robotEyes.findTextInputBox('ap_email')
      robotHands.clickTextInput('ap_email', '@@@@@')
      cy.get('#ap_email').should('not.be.NaN')
      robotEyes.findContinueButton('a-button-inner #continue', '')
      robotHands.clickContinueButton('.a-button-inner #continue')
      cy.wait(2000)
  
      //Feed cred password and continue and assert that its not empty
      robotEyes.findTextInputBox('ap_password')
      robotHands.clickTextInput('ap_password', '@@@@@')
      cy.wait(2000)
      cy.get('#ap_password').should('not.be.NaN')
      robotEyes.findSignInOption('signInSubmit', '')
      robotHands.clickSignIn('#signInSubmit')
      cy.wait(2000)
  
      //Verifying the sign in
      cy.get('#nav-link-accountList-nav-line-1').should('have.text', 'Hello, Preethi')
    })
  
  
    //ADD NEW PAYMENT OPTION AND VERIFY IT
    it('TEST 6: Add payment and verify', () => {
      robotHands.clickOnId('nav-cart-count-container')
      robotHands.clickOnId('sc-buy-box-ptc-button')
      robotHands.checkIfChecked('.a-radio')
      robotHands.clickContinueButton('[data-testid="Address_selectShipToThisAddress"]')
      cy.wait(2000)
      //Select UPI payment option and enter credentials 
      robotHands.selectIfText('.a-row.a-spacing-none > .a-section > .a-color-base', 'Other UPI Apps')
      cy.get('.a-input-text.a-form-normal.no-prefetch-on-change').type('@@@@@')
      cy.get('.a-section.a-spacing-none.pmts-inline-field-block').contains('Verify').click({
        force: true
      })
      cy.wait(2000)
      //Verify the payment option is added
      cy.get('.a-box-inner.a-alert-container').should('be.visible')
      cy.wait(2000)
  
      //Proceed with that payment option added recently
      robotHands.clickContinueButton('#orderSummaryPrimaryActionBtn > .a-button-inner > .a-button-input')
      cy.wait(6000)
  
      //Choose the prime delivery option
      cy.get('.a-radio.radio-standard.no-js-hide').contains('Prime')
      cy.get('fieldset > div.a-row.a-radio.shipping-speed.ship-option.pointer.no-scheduled-delivery > div > label > input[type=radio]').check({
        force: true
      }).should('be.checked')
      //Display the delivery date for the latest product delivery
      cy.get('.shipping-group > :nth-child(1) > .a-color-base').find('span').contains('Delivery date:').parent().should('be.visible')
  
    })
  
    //ADD NEW ADDRESS, PHONE NUMBER, PIN CODE AND CHOOSE ADDRESS TYPE
    //ASSERT TEXT IS ADDED IN TEXT INPUT AND ALSO IN DROPDOWN
  
    it('TEST 7: Add new Address and Verify', () => {
      robotHands.clickSignIn('#nav-link-accountList .nav-line-2')
      robotHands.clickBasedIndex('.ya-card-cell .ya-card__whole-card-link', '3')
      cy.wait(4000)
      robotHands.clickOnDomElement('#ya-myab-address-add-link > .a-box')
      cy.wait(4000)
      robotHands.clickTextInput('address-ui-widgets-enterAddressFullName', 'PREETHI RAJASEKARAN')
      cy.get('#address-ui-widgets-enterAddressFullName').should('not.be.NaN')
  
      robotHands.clickTextInput('address-ui-widgets-enterAddressPhoneNumber', '9876543210')
      cy.get('#address-ui-widgets-enterAddressPhoneNumber').should('not.be.NaN')
  
      robotHands.clickTextInput('address-ui-widgets-enterAddressPostalCode', '123456')
      cy.get('#address-ui-widgets-enterAddressPostalCode').should('not.be.NaN')
  
      robotHands.clickTextInput('address-ui-widgets-enterAddressLine1', 'ABCD EFGH')
      cy.get('#address-ui-widgets-enterAddressLine1').should('not.be.NaN')
  
      robotHands.clickTextInput('address-ui-widgets-enterAddressLine2', 'IJKLMNOPQRSTUV')
      cy.get('#address-ui-widgets-enterAddressLine2').should('not.be.NaN')
  
      robotHands.clickTextInput('address-ui-widgets-landmark', 'OPP TO COLLEGE')
      cy.get('#address-ui-widgets-landmark').should('not.be.NaN')
  
      robotHands.clickTextInput('address-ui-widgets-enterAddressCity', 'CHENNAI')
      cy.get('#address-ui-widgets-enterAddressCity').should('not.be.NaN')
      cy.wait(2000)
  
      robotHands.clickOnDomElement('#address-ui-widgets-enterAddressStateOrRegion > .a-button-inner > .a-button-text')
      cy.wait(2000)
      robotHands.clickOnDomElement('#address-ui-widgets-enterAddressStateOrRegion-dropdown-nativeId_30')
      cy.wait(2000)
      //Choose address type and assert it
      cy.get('#address-ui-widgets-addr-details-address-type-and-business-hours > .a-button-inner > .a-button-text').type('{downarrow}{downarrow}{enter}')
      cy.get('#address-ui-widgets-addr-details-address-type-and-business-hours > .a-button-inner > .a-button-text').should('not.have.text', 'Select an Address Type')
  
      //robotHands.clickContinueButton('address-ui-widgets-form-submit-button > .a-button-inner > .a-button-input')
      robotHands.clickOnNextButton('address-ui-widgets-form-submit-button > .a-button-inner > .a-button-input')
      cy.wait(2000)
      cy.get('.a-alert-heading').should('be.visible')
      //Assert that address is added
      cy.get('.a-box').contains('PREETHI RAJASEKARAN').should('be.visible')
    })
  
  
    //CHECK DELIVERY STATUS OF THE ORDERS MADE
    it('TEST 8: Check the delivery status', () => {
      //Go to your account
      robotHands.clickSignIn('#nav-link-accountList .nav-line-2')
      cy.wait(2000)
      //choose your orders
      robotHands.clickBasedIndex('.ya-card-cell .ya-card__whole-card-link', '0')
      cy.wait(2000)
      //Clicking track package
      cy.get('#a-autoid-3-announce').click()
      cy.get('#pageContainer-inner').should('be.visible')
      cy.wait(3000)
    })
  
    // CHECK PAST ONE YEAR ORDER
    it('TEST 9: list out past one year orders', () => {
      robotHands.clickSignIn('#nav-link-accountList .nav-line-2')
      cy.wait(2000)
      robotHands.clickBasedIndex('.ya-card-cell .ya-card__whole-card-link', '0')
      cy.wait(2000)
  
      //Click on the order history dropdown, choose last year
      cy.get('#a-autoid-1-announce').click()
      cy.wait(2000)
      cy.get('#orderFilter_3').click()
      cy.wait(2000)
      cy.get('.a-box-group').should('be.visible');
      cy.wait(4000)
    })
  
  })