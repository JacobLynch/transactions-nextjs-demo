// This component doesn't need to be a client component as it only displays data
import { Transaction } from '@/types/transaction';
import { formatCurrency, formatDate } from '../../../lib/utils';
import TableActions from './table-actions';

type TransactionItemProps = {
  transaction: Transaction;
};

export function TransactionItem({ transaction }: TransactionItemProps) {
  return (
    <tr key={transaction.id.toString()} className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {transaction.title}
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
        <TableActions transactionId={transaction.id.toString()} />
      </td>
    </tr>
  );
} 