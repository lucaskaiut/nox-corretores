"use client";

import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      fullWidth = false,
      className = "",
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const base =
      "inline-flex items-center justify-center font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 rounded-lg";

    const variants = {
      primary:
        "bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 shadow-sm",
      secondary:
        "border border-neutral-300 bg-transparent text-foreground hover:bg-neutral-100 active:bg-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800",
      ghost:
        "text-foreground hover:bg-neutral-100 active:bg-neutral-200 dark:hover:bg-neutral-800/50 dark:active:bg-neutral-800",
      destructive:
        "bg-red-600 text-white hover:bg-red-700 active:bg-red-800 shadow-sm",
    };

    const sizes = {
      sm: "h-9 px-4 text-sm gap-1.5",
      md: "h-11 px-6 text-base gap-2",
      lg: "h-12 px-8 text-base gap-2",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
      <button
        ref={ref}
        className={`${base} ${variants[variant]} ${sizes[size]} ${widthClass} ${className}`}
        disabled={disabled ?? loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin size-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden
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
            <span>Carregando...</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
