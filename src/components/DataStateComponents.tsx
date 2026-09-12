import React from 'react';
import { Loader2, AlertTriangle, Inbox } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading Beast Factory Data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 space-y-4 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#e8272a]/10 border border-[#e8272a]/20 flex items-center justify-center text-[#e8272a] animate-pulse">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
      <p className="text-sm font-semibold text-neutral-300 tracking-wide">{message}</p>
    </div>
  );
};

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  message = 'Failed to load content. Please check your connection.',
  onRetry
}) => {
  return (
    <div className="glass-panel p-8 rounded-3xl border border-red-500/20 bg-red-950/10 text-center max-w-lg mx-auto my-8 space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mx-auto flex items-center justify-center text-red-500">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="font-heading text-lg text-white tracking-wide">SOMETHING WENT WRONG</h4>
        <p className="text-xs text-neutral-400">{message}</p>
      </div>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs tracking-wider transition-all shadow-lg shadow-red-600/20"
        >
          RETRY NOW
        </button>
      )}
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  message?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Records Found',
  message = 'There are no active items available to display right now.'
}) => {
  return (
    <div className="glass-panel p-12 rounded-3xl border border-neutral-800 text-center max-w-md mx-auto my-8 space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 mx-auto flex items-center justify-center text-neutral-500">
        <Inbox className="w-6 h-6" />
      </div>
      <div className="space-y-1">
        <h4 className="font-heading text-lg text-white tracking-wide">{title}</h4>
        <p className="text-xs text-neutral-400">{message}</p>
      </div>
    </div>
  );
};
