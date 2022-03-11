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
describe('SEARCH FOR DEALS, ADD TO CART', () => {

    before('PRE TEST:Open Amazon India',()=>{
        dependencies.visitAmazon();
    })
    //Search for mobiles, and display the last occuring mobile
    it('TEST 1: Search for Mobiles', () => {
        dependencies.visitAmazon();
        robotHands.clickTextInput('twotabsearchtextbox', 'mobiles')
        cy.wait(2000)
        cy.get('#twotabsearchtextbox').should('not.be.NaN')
        robotHands.clickContinueButton('input#nav-search-submit-button')
        //Handling Child Window in same window using "then" method
        //Scroll down and pick the mobile which is availble in the last of the page
        cy.scrollTo('0%', '85%', {
            easing: 'linear'
        })
        cy.get('.s-search-results .s-result-item').eq(-6).find('.a-link-normal').then(function (elem) {
            const link1 = elem.prop('href')
            cy.visit(link1)
        })
        cy.wait(2000)
        //Assertion for listing the details of the mobile
        cy.get('#dp').should('be.visible')
    })


    //NAVIGATE FROM LEFT NAVBAR AND CHOOSE MOBILES -> SMARTPHONES
    //And get back to Main menu
    it('TEST 2: Select Mobiles from Left Navbar', () => {
        dependencies.visitAmazon();
        robotHands.clickContinueButton('#nav-hamburger-menu')
        cy.wait(2000)
        robotHands.clickContinueDom(':nth-child(15) > .hmenu-item > div')
        cy.wait(2000)
        robotHands.clickContinueButton('.hmenu-visible > :nth-child(3) > .hmenu-item')
        cy.wait(2000)
        robotHands.clickContinueButton('#nav-logo-sprites')
        cy.wait(2000)
        //Asserting that its in home page
        cy.get('#gw-layout').should('be.visible')
    })

    //Check for Today's deals and go to the Laptop section
    //Pick the first latop from "deal of the day"
    it('TEST 3":Check Todays deal', () => {
        dependencies.visitAmazon();
        cy.wait(2000)
        robotHands.clickTodaysDeals("Today's Deals")
        cy.wait(2000)
        cy.get('.a-size-extra-large').should('be.visible')

        //Fetch Laptop from Today's deals
        cy.wait(4000)
        robotHands.clickTextInput('twotabsearchtextbox', 'laptops')
        cy.wait(2000)
        cy.get('#twotabsearchtextbox').should('not.be.NaN')
        robotHands.clickContinueButton('input#nav-search-submit-button')
        cy.wait(4000)

        //Pick the first available "deal of the day" of all laptops listed
        //handle child window concept in cypress
        cy.get('[data-a-badge-type="deal"]').parent('.a-link-normal').parent('.a-row').eq(0).siblings('.a-color-base').find('.a-link-normal').then(function (elem) {
            const link1 = elem.prop('href')
            cy.visit(link1)
        })
        cy.wait(2000)

    })
    //Add the First laptop available from deal of the day, 
    //add it to cart and assert that cart is not empty
    it('TEST 4: Add the "Deal of the day" item to cart', () => {

        robotHands.clickNext('add-to-cart-button')
        cy.wait(4000)
        //close the overlap window for installation service
        robotHands.clickContinueButton('.a-button-close')
        cy.wait(4000)

        //Locate sign in button and clicking sign in
        robotEyes.findSignInOption('nav-link-accountList .nav-line-2', 'Account & Lists\n  ');
        cy.wait(2000)
        robotHands.clickSignIn('#nav-link-accountList .nav-line-2')
        cy.wait(2000)

        //Feed sign in credential username and continue
        robotEyes.findTextInputBox('ap_email')
        robotHands.clickTextInput('ap_email', '@@@@@')
        cy.wait(2000)
        robotEyes.findContinueButton('a-button-inner #continue', '')
        robotHands.clickContinueButton('.a-button-inner #continue')
        cy.wait(2000)

        //Feed cred password and continue
        robotEyes.findTextInputBox('ap_password')
        robotHands.clickTextInput('ap_password', '@@@@@')
        cy.wait(2000)
        robotEyes.findSignInOption('signInSubmit', '')
        robotHands.clickSignIn('#signInSubmit')
        cy.wait(2000)

        robotHands.clickNext('a-autoid-0 > .a-button-inner > .a-button-input')
        cy.wait(4000)
        cy.get('#sc-active-cart').should('be.visible')
        //Assert the cart count is not empty
        cy.get('#nav-cart-count').should('not.have.value',0)
        
    })

})