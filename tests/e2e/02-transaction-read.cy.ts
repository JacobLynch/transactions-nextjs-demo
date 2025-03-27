/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Read Transactions', () => {
  beforeEach(() => {
    // Visit the homepage where the transactions are listed
    cy.visit('/');
    
    // Ensure the page is loaded by waiting for the heading
    cy.findByRole('heading', { name: /transaction management/i }).should('be.visible');
  });

  it('should display transaction list', () => {
    // Check that the transaction table is visible
    cy.get('table').should('be.visible');
    
    // Check that the table has headers
    cy.contains('th', 'Title').should('be.visible');
    cy.contains('th', 'Amount').should('be.visible');
    cy.contains('th', 'Description').should('be.visible');
    cy.contains('th', 'From').should('be.visible');
    cy.contains('th', 'To').should('be.visible');
    cy.contains('th', 'Date').should('be.visible');
    cy.contains('th', 'Actions').should('be.visible');
  });

  it('should show transaction details', () => {
    // This test assumes there's at least one transaction in the system
    // If the app starts with no transactions, this test would need to create one first
    
    // Check that at least one transaction row exists
    cy.get('table tbody tr').should('have.length.at.least', 1);
    
    // Verify that each transaction row has all required cells
    cy.get('table tbody tr').first().within(() => {
      // Check that all cells exist and are not empty
      cy.get('td').should('have.length.at.least', 7);
      
      // Verify the delete button exists
      cy.get('button[aria-label="Delete transaction"]').should('be.visible');
    });
  });
}); 