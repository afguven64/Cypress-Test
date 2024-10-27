import {errorMessages} from "../../src/components/Register.jsx";

describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  describe("Error Messages", () => {
    it('name input throws error for 2 chars', () => {
      //cy.visit('http://localhost:5173/')

      cy.get('[data-cy="ad-input"]').type("ah")

      cy.contains(errorMessages.ad)


    });
    it('Surname input throws error for 2 chars', () => {
      //cy.visit('http://localhost:5173/')

      cy.get('[data-cy="soyad-input"]').type("gü")

      cy.contains(errorMessages.soyad)


    });
    it('Email input throws error for emre@wit.', () => {
      //cy.visit('http://localhost:5173/')

      cy.get('[data-cy="email-input"]').type("ahmet@wit.")

      cy.contains(errorMessages.email)


    });
    it('Password input throws error for 1234', () => {
      //cy.visit('http://localhost:5173/')

      cy.get('[data-cy="password-input"]').type("1234")

      cy.contains(errorMessages.password)


    });
    it('Button is disabled for unvalidated input', () => {
      //cy.visit('http://localhost:5173/')

      cy.get('[data-cy="password-input"]').type("1234")

      cy.get('[data-cy="submit-button"]').should("be.disabled")


    });
  });
  describe("Form inputs validated", () => {
    it('button enabled for validated inputs', () => {
      //cy.visit('http://localhost:5173/')

      cy.get('[data-cy="ad-input"]').type("Ahmet")
      cy.get('[data-cy="soyad-input"]').type("Güven")
      cy.get('[data-cy="email-input"]').type("ahmet@wit.com.tr")
      cy.get('[data-cy="password-input"]').type("1234Aa**")

      cy.get('[data-cy="submit-button"]').should("not.be.disabled")


    });
    it('id', () => {
      //cy.visit('http://localhost:5173/')

      cy.get('[data-cy="ad-input"]').type("Ahmet")
      cy.get('[data-cy="soyad-input"]').type("Güven")
      cy.get('[data-cy="email-input"]').type("ahmet@wit.com.tr")
      cy.get('[data-cy="password-input"]').type("1234Aa**")

      cy.get('[data-cy="submit-button"]').click()
      cy.get('[data-cy="res-message"]').should("be.visible")


    });
  });
});