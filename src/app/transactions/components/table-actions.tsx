'use client';

import { TrashIcon } from '@heroicons/react/24/outline';
import { deleteTransaction } from '../actions';

type TableActionsProps = {
  transactionId: string;
};

export default function TableActions({ transactionId }: TableActionsProps) {
  const handleEdit = () => {
    // Edit action logic
    console.log('Edit transaction', transactionId);
  };

  const handleDelete = async () => {
    // Use browser's built-in confirm dialog
    const confirmDelete = window.confirm('Are you sure you want to delete this transaction? This action cannot be undone.');
    
    if (confirmDelete) {
      try {
        // Convert string ID to BigInt for the action
        const result = await deleteTransaction(BigInt(transactionId));
        
        if (result.error) {
          // Show error message if deletion fails
          alert(`Error: ${result.error}`);
        }
      } catch (error) {
        console.error('Failed to delete transaction:', error);
        alert('Failed to delete transaction. Please try again.');
      }
    }
  };

  return (
    <div className="space-x-2">
      <button 
        className="text-red-600 hover:text-red-900 cursor-pointer"
        onClick={handleDelete}
        aria-label="Delete transaction"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
} 