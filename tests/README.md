# Cypress Tests for Transaction CRUD Operations

This directory contains end-to-end tests for the transaction CRUD (Create, Read, Update, Delete) functionality.

## Test Files

- `transaction-create.cy.ts`: Tests creating a new transaction
- `transaction-read.cy.ts`: Tests listing and viewing transactions
- `transaction-update.cy.ts`: Tests updating an existing transaction
- `transaction-delete.cy.ts`: Tests deleting a transaction

## Running the Tests

### Prerequisites

1. Make sure you have installed all dependencies:
   ```
   npm install
   ```

2. The application database should be set up correctly. If using a local database, make sure it's running.

### Running the Tests

1. First, start the application in a separate terminal:
   ```
   npm run dev
   ```

2. Then, in a separate terminal, run the Cypress tests in one of the following ways:

   - Run all transaction tests:
     ```
     npm run test:transactions
     ```

   - Run a specific test:
     ```
     npx cypress run --spec "tests/e2e/transaction-create.cy.ts"
     ```

   - Open Cypress GUI for interactive testing:
     ```
     npm run cypress:open
     ```

### Test Execution Order

For the most reliable results, run the tests in this order:

1. `transaction-create.cy.ts` - Creates test data for other tests
2. `transaction-read.cy.ts` - Reads and verifies data
3. `transaction-update.cy.ts` - Updates existing data
4. `transaction-delete.cy.ts` - Deletes data and verifies empty state

## Troubleshooting

- If tests fail due to missing elements, check the application's component structure and update the selectors accordingly.
- If you're using different form field labels, update the `fillTransactionForm` command in `tests/support/e2e.ts`.
- For issues with test timeouts, you may need to increase the timeout values in `cypress.config.ts`. 