"use client";

import { forwardRef } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  loading?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, loading = false, className = "", ...props }, ref) => {
    const base =
      "flex h-11 w-full rounded-lg border bg-neutral-900/50 px-4 py-2 text-foreground placeholder:text-neutral-500 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium";

    const states = error
      ? "border-red-500/70 focus-visible:border-red-500 focus-visible:ring-red-500/30"
      : "border-neutral-700 focus-visible:border-primary-500 focus-visible:ring-primary-500/30";

    const focusRing = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50";

    return (
      <div className="relative w-full">
        <input
          ref={ref}
          className={`${base} ${states} ${focusRing} ${className}`}
          disabled={loading || props.disabled}
          aria-invalid={error}
          aria-busy={loading}
          {...props}
        />
        {loading && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-hidden
          >
            <svg
              className="animate-spin size-5 text-neutral-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
