/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Update Transaction', () => {
  const updatedValues = {
    title: 'Updated Transaction',
    amount: 200,
    description: 'Updated description for the transaction',
    fromAccount: 'Checking',
    toAccount: 'Credit Card',
    transactionDate: '2025-01-02T12:00'
  };

  beforeEach(() => {
    // Visit the homepage where the transactions are listed
    cy.visit('/');
    
    // Ensure the page is loaded by waiting for the heading
    cy.findByRole('heading', { name: /transaction management/i }).should('be.visible');
  });

  it('should update an existing transaction', () => {
    // This test assumes there's at least one transaction in the system
    // If the app starts with no transactions, this test would need to create one first
    
    // Get the first transaction in the list and click the row to open the edit modal
    cy.get('table tbody tr').first().click();
    
    // Verify the update modal is open
    cy.findByRole('heading', { name: /edit transaction/i }).should('be.visible');
    
    // Fill in form fields with updated values using our custom command
    cy.fillTransactionForm(updatedValues);
    
    // Submit the form
    cy.findByRole('button', { name: /save/i }).click();
    
    // Verify the transaction was updated by checking if the updated values appear in the list
    cy.findByText(updatedValues.title).should('be.visible');
    cy.findByText(updatedValues.description).should('be.visible');
    cy.findByText(new RegExp(updatedValues.amount.toString())).should('be.visible');
  });
}); 