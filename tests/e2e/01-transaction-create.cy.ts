/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Create Transaction', () => {
  const testTransaction = {
    title: 'Test Transaction',
    amount: 100,
    description: 'Test description for the transaction',
    fromAccount: 'Savings',
    toAccount: 'Checking',
    transactionDate: '2025-01-01T12:00'
  };

  beforeEach(() => {
    // Visit the homepage where the transactions are listed
    cy.visit('/');
    
    // Ensure the page is loaded by waiting for the heading
    cy.findByRole('heading', { name: /transaction management/i }).should('be.visible');
  });

  it('should create a new transaction', () => {
    // Click the "Add" button
    cy.findByRole('button', { name: /add/i }).click();
    
    // Verify the modal is open
    cy.findByRole('heading', { name: /create new transaction/i }).should('be.visible');
    
    // Fill in form fields using our custom command
    cy.fillTransactionForm(testTransaction);
    
    // Submit the form
    cy.findByRole('button', { name: /save/i }).click();
    
    // Verify the transaction was created by checking if it appears in the list
    cy.findByText(testTransaction.title).should('be.visible');
    cy.findByText(testTransaction.description).should('be.visible');
    // Check for formatted amount (may have currency symbol)
    cy.findByText(new RegExp(testTransaction.amount.toString())).should('be.visible');
  });
}); 