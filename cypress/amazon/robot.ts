import { BaseEyes, BaseHands, BaseDependencies } from "../robots/BaseRobot";

export class Dependencies extends BaseDependencies {
    visitAmazon() {
        cy.fixture("amazon.json").then((user) => {
            cy.visit(user.url)
        })
    }
}

export class RobotHands extends BaseHands {

    clickTodaysDeals(element : string){
        this.clickOnContainElement(element)

    }
    clickSignIn(elementId: string, index: number) {
        this.clickOnDomElement(elementId)
    }
    clickTextInput(elementId: string, textOnElement: string) {
        this.typeTextonId(elementId, textOnElement)
    }
    clickContinueButton(elementId: string, index: number) {
        this.clickOnDomElement(elementId)
    }
    clickBasedIndex(elementId: string, index: number) {
        this.clickOnDomElementWithIndex(elementId, index)
    }
    selectIfText(elementId: string, text: string) {
        this.clickOnDomElementWithText(elementId, text)
    }
    checkIfChecked(elementId:string){
        cy.get(elementId).first().find('input').not('[disabled]').check().should('be.checked')
    }
    clickNext(elementId: string, index: number) {
        this.clickOnId(elementId)
    }
    clickOnOrders(text: string) {
        this.clickOnDomElement(text)
    }
    clickContinueDom(elementId:string){
        this.clickOnDomElement(elementId)
    }
    clickOnNextButton(text1:string,index:number)
    {
        this.clickOnId(text1) 
    }

    checkingOutItems() {
        cy.get('#nav-cart').click()
        cy.wait(2000)
        cy.get('#sc-buy-box-ptc-button > .a-button-inner > .a-button-input').click()
        cy.get('.a-radio').first().find('input').not('[disabled]').check().should('be.checked')
        cy.get('#subtotals .a-box-inner').find('input')
    }
}

export class RobotEyes extends BaseEyes {
    seeCartItems() {
        this.seesDomVisible("Main page")
    }
    findSignInOption(elementId: string, textOnElement: string) {
        this.seesTextWithId(elementId, textOnElement)
    }
    findTextInputBox(elementId: string) {
        this.seesIdVisible(elementId)
    }
    findContinueButton(elementId: string, textOnElement: string) {
        this.seesTextWithClass(elementId, textOnElement)
    }

    findTextInputWithClassIndex(elementClass: string, textOnElement: string) {
        this.seesTextWithClass(elementClass, textOnElement)
    }

}