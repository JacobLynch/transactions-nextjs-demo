'use client';

import { useState } from 'react';
import { Transaction } from '@/types/transaction';
import { formatCurrency, formatDate } from '@/lib/utils';
import TableActions from './table-actions';
import UpdateModal from './update-modal';

type TransactionItemProps = {
  transaction: Transaction;
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const handleRowClick = (e: React.MouseEvent) => {
    // Prevent opening modal when clicking the actions column
    if ((e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('td:last-child')) {
      return;
    }
    
    setIsUpdateModalOpen(true);
  };

  return (
    <>
      <tr 
        key={transaction.id.toString()} 
        className="hover:bg-gray-50 cursor-pointer"
        onClick={handleRowClick}
      >
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {transaction.title}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {transaction.description}
        </td>
        <td className={`px-6 py-4 whitespace-nowrap text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {formatCurrency(transaction.amount/100)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {transaction.fromAccount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {transaction.toAccount}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {formatDate(transaction.transactionDate)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <TableActions transactionId={transaction.id} />
        </td>
      </tr>

      {isUpdateModalOpen && (
        <UpdateModal 
          isOpen={isUpdateModalOpen} 
          onClose={() => setIsUpdateModalOpen(false)}
          transaction={transaction}
        />
      )}
    </>
  );
} 