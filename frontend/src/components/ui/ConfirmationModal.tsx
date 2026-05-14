import Modal from './Modal'; // Ajusta la ruta según tu carpeta
import { TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  message: string;
  title?: string;
  confirmText?: string;
  isDanger?: boolean;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  message,
  title = "Confirmar acción",
  confirmText = "Eliminar",
  isDanger = true,
}: ConfirmationModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    // Prevenir múltiples clics
    if (isLoading) return;
    setIsLoading(true);

    try {
      await onConfirm();
      onClose();
    } fidisabled={isLoading}
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Cancelar
      </button>
      <button
        onClick={handleConfirm}
        disabled={isLoading}
        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-600 hover:bg-primary-700'
        }`}
      >
        {isLoading ? "Procesando..." : 
        Cancelar
      </button>
      <button
        onClick={handleConfirm}
        className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
          isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-primary-600 hover:bg-primary-700'
        }`}
      >
        {confirmText}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      footer={footer}
    >
      <div className="flex flex-col items-center text-center gap-4">
        {isDanger && (
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <TrashIcon className="h-6 w-6 text-red-600" />
          </div>
        )}
        <p className="text-gray-600">
          {message}
        </p>
      </div>
    </Modal>
  );
}
