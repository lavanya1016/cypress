/// <reference types="Cypress" />
import '../support/index';
import {Login} from "../cyPom/login"

const login =new Login();


describe('Login to Amazon website', function () {
  before(function () {
      login.visitAmazon();
      cy.fixture('amazon').then(function (testdata) {
          this.testdata = testdata
      })
  })

  it('Validate successful Login', function () {
      let username=this.testdata.email;
      let password=this.testdata.password;
      login.signIn(username,password);
      
  })
})