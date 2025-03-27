import TransactionsTable from './transactions/components/table';
import AddButton from './transactions/components/add-button';
import { getTransactions } from './transactions/actions';
import { Transaction } from '@/types/transaction';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const { transactions, error } = await getTransactions();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Transaction Management</h1>
          <p className="text-gray-600">Manage your financial transactions with ease.</p>
        </div>
      </header>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Transactions</h2>
        <AddButton />
      </div>
      
      {error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      ) : (
        <TransactionsTable transactions={transactions as Transaction[]} />
      )}
    </div>
  );
}
