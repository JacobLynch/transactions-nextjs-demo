'use client';

import { TrashIcon } from '@heroicons/react/24/outline';

type TableActionsProps = {
  transactionId: string;
};

export default function TableActions({ transactionId }: TableActionsProps) {
  const handleEdit = () => {
    // Edit action logic
    console.log('Edit transaction', transactionId);
  };

  const handleDelete = () => {
    // Delete action logic
    console.log('Delete transaction', transactionId);
  };

  return (
    <div className="space-x-2">
      <button 
        className="text-red-600 hover:text-red-900"
        onClick={handleDelete}
        aria-label="Delete transaction"
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </div>
  );
} 