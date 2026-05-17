'use client';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { useRouter } from 'next/navigation';

const LogoutModal = ({ isOpen, onClose, onConfirmLogout }) => {
  const router = useRouter();

  const handleLogout = () => {
    if (onConfirmLogout) onConfirmLogout(); // Clear auth contexts/tokens if needed
    onClose(); // Close the modal
    router.push('/login'); // Redirect to login page
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-brand-black/50 transition-opacity" />

      {/* Modal Container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-hintro bg-surface p-6 text-left align-middle border border-surface-border shadow-xl transition-all">
          
          <DialogTitle as="h3" className="text-xl font-bold leading-6 text-brand-text-main mb-2">
            Leaving already?
          </DialogTitle>

          <div className="mt-2">
            <p className="text-sm text-brand-text-muted leading-relaxed">
              You can log back in anytime to continue your meetings with Hintro.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold text-brand-text-muted border border-surface-border hover:bg-surface-alt transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand-black hover:bg-brand-black-dark text-white transition-colors cursor-pointer"
            >
              Log out
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default LogoutModal;