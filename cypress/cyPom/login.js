export class Login{

    visitAmazon() {  
        cy.visit("https://www.amazon.in/");  
        return this; 
      }
    signIn(username,password){
        cy.get("#nav-link-accountList-nav-line-1").click({});
        cy.get('#ap_email').type(username);
        cy.get(".a-button-inner > #continue").click({});
        cy.get('#ap_password').type(password);
        cy.get("#auth-signin-button").click({});
        return this;

    }

}