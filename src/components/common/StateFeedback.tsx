import React from 'react';
import { Loader2, AlertTriangle, Inbox } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading data...',
  className = 'py-12',
}) => (
  <div className={`flex flex-col items-center justify-center text-center space-y-3 ${className}`}>
    <Loader2 className="w-8 h-8 text-[#e8272a] animate-spin" />
    <p className="text-neutral-400 text-sm">{message}</p>
  </div>
);

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Failed to load content. Please try again.',
  onRetry,
  className = 'py-12',
}) => (
  <div className={`flex flex-col items-center justify-center text-center space-y-4 ${className}`}>
    <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-[#e8272a]">
      <AlertTriangle className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-heading text-xl text-white">{title}</h4>
      <p className="text-neutral-400 text-sm max-w-sm mt-1">{message}</p>
    </div>
    {onRetry && (
      <button
        onClick={onRetry}
        className="px-5 py-2 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-semibold uppercase tracking-wider border border-neutral-700 transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

interface EmptyStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No items found',
  message = 'There are no records to display at the moment.',
  actionLabel,
  onAction,
  className = 'py-12',
}) => (
  <div className={`flex flex-col items-center justify-center text-center space-y-4 ${className}`}>
    <div className="w-12 h-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
      <Inbox className="w-6 h-6" />
    </div>
    <div>
      <h4 className="font-heading text-xl text-white">{title}</h4>
      <p className="text-neutral-400 text-sm max-w-sm mt-1">{message}</p>
    </div>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="px-5 py-2 rounded-full bg-[#e8272a] hover:bg-[#ff1e1e] text-white text-xs font-semibold uppercase tracking-wider transition-colors"
      >
        {actionLabel}
      </button>
    )}
  </div>
);
