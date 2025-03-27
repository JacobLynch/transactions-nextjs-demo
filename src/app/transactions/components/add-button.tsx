'use client';

import { useState } from 'react';
import CreateModal from './create-modal';

export default function AddButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={openModal}
      >
        Add
      </button>

      <CreateModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
} 