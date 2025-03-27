import { useState } from 'react';
import { TransactionForm } from './form';
import { CreateTransaction } from '@/types/transaction';
import { createTransaction } from '../actions';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateModal({ isOpen, onClose }: CreateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: CreateTransaction) => {
    try {
      setIsSubmitting(true);
      const result = await createTransaction(data);
      if (result.error) {
        throw new Error(result.error);
      }
      onClose();
    } catch (error) {
      console.error('Failed to create transaction:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          onClick={onClose}
        />

        {/* Modal content */}
        <div className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Create New Transaction</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <TransactionForm
            onSubmit={handleSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}
