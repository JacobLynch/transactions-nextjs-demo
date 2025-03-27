/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

describe('Delete Transaction', () => {
  beforeEach(() => {
    // Visit the homepage where the transactions are listed
    cy.visit('/');
    
    // Ensure the page is loaded by waiting for the heading
    cy.findByRole('heading', { name: /transaction management/i }).should('be.visible');
    
    // Stub the window.confirm to return true
    cy.window().then(win => {
      cy.stub(win, 'confirm').returns(true);
    });
  });

  it('should delete an existing transaction', () => {
    // This test assumes there's at least one transaction in the system
    // If the app starts with no transactions, this test would need to create one first
    
    // Get the first transaction title for later verification
    cy.get('table tbody tr')
      .first()
      .find('td')
      .eq(0)
      .invoke('text')
      .then((transactionTitle) => {
        // Ensure we have a valid transaction title
        expect(transactionTitle.trim()).to.not.be.empty;
        
        // Get the first transaction in the list and click its delete button
        cy.get('table tbody tr').first().within(() => {
          cy.get('button[aria-label="Delete transaction"]').click();
        });
        
        // No need to click confirmation button - we stubbed window.confirm to return true
        
        // Verify the transaction is no longer in the list
        // Only run this verification if we have a non-empty title
        cy.contains('td', transactionTitle).should('not.exist');
      });
  });
}); 