/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

// Import Testing Library commands
import '@testing-library/cypress/add-commands';

// ***********************************************************
// This support file is processed and loaded automatically before your test files.
// This is a great place to put global configuration and behavior that modifies Cypress.
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

// Custom command to select a field by label
Cypress.Commands.add('getByLabel', (label: string) => {
  return cy.contains('label', label).invoke('attr', 'for').then((id) => {
    return cy.get(`#${id}`);
  });
});

// Custom command to fill out transaction form with Testing Library selectors
Cypress.Commands.add('fillTransactionForm', (transaction: {
  title?: string;
  amount?: number;
  description?: string;
  fromAccount?: string;
  toAccount?: string;
  transactionDate?: string;
}) => {
  if (transaction.title) {
    cy.findByLabelText('Title').clear().type(transaction.title);
  }
  
  if (transaction.amount) {
    cy.findByLabelText('Amount ($)').clear().type(transaction.amount.toString());
  }
  
  if (transaction.description) {
    cy.findByLabelText('Description').clear().type(transaction.description);
  }
  
  if (transaction.fromAccount) {
    cy.findByLabelText('From Account').clear().type(transaction.fromAccount);
  }
  
  if (transaction.toAccount) {
    cy.findByLabelText('To Account').clear().type(transaction.toAccount);
  }
  
  if (transaction.transactionDate) {
    // Handle date and time inputs separately as the main label doesn't have a "for" attribute
    // Parse the ISO date string
    const date = new Date(transaction.transactionDate);
    const dateString = date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    const timeString = date.toISOString().split('T')[1].substring(0, 5); // Format: HH:MM
    
    // Fill date input
    cy.get('#transaction-date').clear().type(dateString);
    
    // Fill time input
    cy.get('#transaction-time').clear().type(timeString);
  }
});

// Type definitions for custom commands
declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by label text
       * @example cy.getByLabel('Email')
       */
      getByLabel(label: string): Chainable<JQuery<HTMLElement>>;
      
      /**
       * Custom command to fill transaction form fields
       * @example cy.fillTransactionForm({ title: 'Rent', amount: 1200 })
       */
      fillTransactionForm(transaction: {
        title?: string;
        amount?: number;
        description?: string;
        fromAccount?: string;
        toAccount?: string;
        transactionDate?: string;
      }): void;
    }
  }
} 