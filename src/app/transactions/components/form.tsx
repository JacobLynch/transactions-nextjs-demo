import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema, CreateTransaction } from '@/types/transaction';
import { useState, useEffect } from 'react';

interface TransactionFormProps {
  initialData?: Partial<CreateTransaction>;
  onSubmit: (data: CreateTransaction) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function TransactionForm({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting
}: TransactionFormProps) {
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm<CreateTransaction>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      amount: initialData?.amount ? initialData.amount / 100 : 0, // Convert cents to dollars for display
      fromAccount: initialData?.fromAccount || '',
      toAccount: initialData?.toAccount || '',
      transactionDate: initialData?.transactionDate || new Date().toISOString(),
    }
  });

  // Create local state for date and time to make it more user-friendly
  const [localDate, setLocalDate] = useState(() => {
    const date = initialData?.transactionDate 
      ? new Date(initialData.transactionDate)
      : new Date();
    
    return {
      date: date.toISOString().split('T')[0], // YYYY-MM-DD
      time: date.toISOString().split('T')[1].substring(0, 5) // HH:MM
    };
  });

  // Update the ISO datetime string whenever local date or time changes
  useEffect(() => {
    if (localDate.date) {
      try {
        // Combine date and time and convert to ISO string with timezone
        const dateTimeString = `${localDate.date}T${localDate.time || '00:00'}:00.000Z`;
        const dateObj = new Date(dateTimeString);
        
        if (!isNaN(dateObj.getTime())) {
          setValue('transactionDate', dateObj.toISOString(), { shouldValidate: true });
        }
      } catch {
        // Silent catch - validation will handle error display
      }
    }
  }, [localDate, setValue]);

  const onSubmitForm = async (data: CreateTransaction) => {
    try {
      setError(null);
      // Convert dollars to cents before sending to the server
      const dataToSubmit = {
        ...data,
        amount: Math.round(data.amount * 100) // Multiply by 100 and round to ensure integer
      };
      await onSubmit(dataToSubmit);
      reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while submitting the form');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          rows={3}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          Amount ($)
        </label>
        <input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          {...register('amount', { 
            valueAsNumber: true,
            setValueAs: (value) => {
              // Ensure we have a valid number
              const num = parseFloat(value);
              return isNaN(num) ? 0 : num;
            }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="fromAccount" className="block text-sm font-medium text-gray-700">
          From Account
        </label>
        <input
          id="fromAccount"
          type="text"
          {...register('fromAccount')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.fromAccount && (
          <p className="mt-1 text-sm text-red-600">{errors.fromAccount.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="toAccount" className="block text-sm font-medium text-gray-700">
          To Account
        </label>
        <input
          id="toAccount"
          type="text"
          {...register('toAccount')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.toAccount && (
          <p className="mt-1 text-sm text-red-600">{errors.toAccount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Transaction Date
        </label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="transaction-date" className="sr-only">Date</label>
            <input
              id="transaction-date"
              type="date"
              value={localDate.date}
              onChange={(e) => setLocalDate(prev => ({ ...prev, date: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="transaction-time" className="sr-only">Time</label>
            <input
              id="transaction-time"
              type="time"
              value={localDate.time}
              onChange={(e) => setLocalDate(prev => ({ ...prev, time: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <input type="hidden" {...register('transactionDate')} />
        {errors.transactionDate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.transactionDate.message || 'Please enter a valid date and time'}
          </p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          All times are stored in UTC format
        </p>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
