import { z } from 'zod';

// Define the transaction schema matching the Prisma model
export const transactionSchema = z.object({
  id: z.bigint(),
  title: z.string().min(1, "Title is required").max(100, "Title must be 100 characters or less"),
  amount: z.number().int("Amount must be a whole number").refine(n => n !== 0, "Amount cannot be zero"),
  description: z.string().min(1, "Description is required").max(500, "Description must be 500 characters or less"),
  fromAccount: z.string().min(1, "Source account is required"),
  toAccount: z.string().min(1, "Destination account is required"),
  transactionDate: z.string().datetime({ 
    offset: true, 
    message: "Please enter a valid date and time" 
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Frontend schema that allows decimal values for amount
const frontendTransactionSchema = transactionSchema.omit({ id: true, createdAt: true, updatedAt: true }).extend({
  amount: z.number().refine(n => n !== 0, "Amount cannot be zero"),
});

// Create transaction schema (everything except the id, createdAt, and updatedAt which will be generated)
export const createTransactionSchema = frontendTransactionSchema;

// Update transaction schema (everything optional except the id)
export const updateTransactionSchema = frontendTransactionSchema
  .partial()
  .merge(z.object({ id: z.bigint() }));

// Types inferred from the schemas
export type Transaction = z.infer<typeof transactionSchema>;
export type CreateTransaction = z.infer<typeof frontendTransactionSchema>;
export type UpdateTransaction = z.infer<typeof updateTransactionSchema>;
