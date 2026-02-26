import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon } from '@heroicons/react/24/outline';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl'
}

export default function Modal({ isOpen, onClose, title, description, children, size }: ModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/*OVERLAY*/}
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300 z-50" />
        
        {/*CONTENIDO*/}
        <Dialog.Content className={`fixed left-1/2 top-1/2 w-full ${sizeClasses[size || 'md']} -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl animate-in zoom-in-95 duration-300 z-50`}>
          <div className="flex items-center justify-between mb-4">
            {title && (
              <Dialog.Title className="text-xl font-serif font-bold text-black-primary">
                {title}
              </Dialog.Title>
            )}
            
            <Dialog.Close asChild>
              <button 
                className="rounded-full p-1 text-gray-primary hover:bg-gray-100 transition-colors"
                aria-label="Close"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </Dialog.Close>
          </div>

          {description && (
            <Dialog.Description className="mb-5 text-sm text-gray-secondary">
              {description}
            </Dialog.Description>
          )}

          <div className="mt-2">
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
