'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { createTransactionSchema, updateTransactionSchema } from '@/types/transaction';

/**
 * Get all transactions
 */
export async function getTransactions() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: {
        transactionDate: 'desc',
      },
    });
    
    return { transactions };
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    return { error: 'Failed to fetch transactions' };
  }
}

/**
 * Create a new transaction
 */
export async function createTransaction(data: z.infer<typeof createTransactionSchema>) {
  try {
    // Validate the input data
    const validatedData = createTransactionSchema.parse(data);
    
    // Create the transaction
    const transaction = await prisma.transaction.create({
      data: validatedData,
    });
    
    // Revalidate the transactions path to update the UI
    revalidatePath('/');
    
    return { transaction };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors.map(err => `${err.path}: ${err.message}`).join(', ') };
    }
    
    console.error('Failed to create transaction:', error);
    return { error: 'Failed to create transaction' };
  }
}

/**
 * Update an existing transaction
 */
export async function updateTransaction(data: z.infer<typeof updateTransactionSchema>) {
  try {
    // Validate the input data
    const validatedData = updateTransactionSchema.parse(data);
    const { id, ...updateData } = validatedData;
    
    // If amount is being updated, convert it to cents for database storage
    const dbData = updateData.amount !== undefined 
      ? { ...updateData, amount: Math.round(updateData.amount * 100) }
      : updateData;
    
    // Update the transaction
    const transaction = await prisma.transaction.update({
      where: { id },
      data: dbData,
    });
    
    // Revalidate the transactions path to update the UI
    revalidatePath('/');
    
    return { transaction };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors.map(err => `${err.path}: ${err.message}`).join(', ') };
    }
    
    console.error('Failed to update transaction:', error);
    return { error: 'Failed to update transaction' };
  }
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(id: bigint) {
  try {
    await prisma.transaction.delete({
      where: { id },
    });
    
    // Revalidate the transactions path to update the UI
    revalidatePath('/');
    
    return { success: true };
  } catch (error) {
    console.error(`Failed to delete transaction ${id}:`, error);
    return { error: 'Failed to delete transaction' };
  }
}
