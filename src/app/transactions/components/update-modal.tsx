import { useState, useEffect, useRef } from 'react';
import { TransactionForm } from './form';
import { updateTransaction } from '../actions';
import { CreateTransaction, Transaction } from '@/types/transaction';
import { createPortal } from 'react-dom';

interface UpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction;
}

export default function UpdateModal({ isOpen, onClose, transaction }: UpdateModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<Element | null>(null);

  // Handle focus management
  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement;
      
      // Focus the modal when it opens
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else if (previousActiveElement.current) {
      // Restore focus when modal closes
      (previousActiveElement.current as HTMLElement).focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Restore body scroll when modal closes
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (data: CreateTransaction) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const updateData = {
        ...data,
        id: transaction.id,
      };
      
      const result = await updateTransaction(updateData);
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      onClose();
    } catch (error) {
      console.error('Failed to update transaction:', error);
      setError(error instanceof Error ? error.message : 'Failed to update transaction');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal content */}
        <div 
          ref={modalRef}
          className="relative transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all w-full max-w-md"
          tabIndex={-1}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 id="modal-title" className="text-lg font-semibold text-gray-900">Edit Transaction</h3>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-500"
              onClick={onClose}
              aria-label="Close modal"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {error ? (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
              <p>{error}</p>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  className="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <TransactionForm
              initialData={transaction}
              onSubmit={handleSubmit}
              onCancel={onClose}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>,
    document.body
  );
} 