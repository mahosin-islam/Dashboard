'use client';
import { PhoneOff } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-surface border border-dashed border-gray-300 rounded-2xl mt-6">
      <div className="bg-gray-50 p-6 rounded-full mb-4">
        <PhoneOff size={48} className="text-gray-300" />
      </div>
      <h3 className="text-lg font-semibold text-brand-text-muted">No calls found</h3>
      <p className="text-brand-text-muted text-sm mt-1">
        It looks like you haven t made any calls yet
      </p>
      <button className="mt-6 bg-brand-black text-surface px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all">
        Start your first call
      </button>
    </div>
  );
};

export default EmptyState;