'use client'

import React from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "primary",
  onClick,
  disabled = false,
  className,
  type = "button",
  children,
}) => {
  const baseStyles =
    "px-6 py-2 rounded-md font-semibold text-sm cursor-pointer transition-all duration-200 focus:outline-none";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-primary text-white hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed",
    secondary:
      "border border-white text-white hover:bg-white hover:text-[#0E2C36] disabled:opacity-50 disabled:cursor-not-allowed",
  };

  

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(baseStyles, variants[variant], className)}
    >
      {label || children}
    </button>
  );
};

export default Button;
