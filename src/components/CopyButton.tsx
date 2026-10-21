import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  text,
  label = 'Copy',
  className = '',
  variant = 'secondary'
}) => {
  const [copied, setCopied] = useState(false);
  const { addToast } = useToast();

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!text) {
      addToast('Nothing to copy', 'error');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      addToast('Copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers / iframe permissions
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      addToast('Copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : label}
        title={label}
        className={`p-2 rounded-xl text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-600 ${className}`}
      >
        {copied ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
      </button>
    );
  }

  const baseStyles = 'inline-flex items-center justify-center gap-2 px-3.5 py-2 text-sm font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-1';
  const variantStyles = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs hover:shadow-sm',
    secondary: 'bg-white dark:bg-[#151E19] hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 border border-stone-200/90 dark:border-stone-800 shadow-xs',
    ghost: 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50'
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
