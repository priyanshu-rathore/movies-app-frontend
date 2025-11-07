import React from "react";
import clsx from "clsx";

type InputStyleType = "default" | "active" | "error";
type InputHTMLType = "text" | "email" | "password" | "checkbox";

interface InputProps {
  label?: string;
  value?: string | boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  placeholder?: string;
  error?: string;
  variant?: InputStyleType;
  name?: string;
  disabled?: boolean;
  type?: InputHTMLType;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  variant = "default",
  name,
  disabled = false,
  type = "text",
}) => {
  const baseStyles =
    "w-full px-4 py-2 rounded-md outline-none placeholder:text-white transition-all duration-200";

  const variants: Record<InputStyleType, string> = {
    default: "bg-input text-white placeholder-white/70",
    active:
      "border border-input text-gray-900 bg-transparent focus:ring-2 focus:ring-input",
    error:
      "border border-error text-red-600 bg-transparent focus:ring-2 focus:ring-red-400",
  };

  // ✅ For checkbox input — custom styling
  if (type === "checkbox") {
    return (
      <div className="flex items-center gap-2">
        <input
          id={name}
          name={name}
          type="checkbox"
          checked={!!value}
          onChange={onChange}
          disabled={disabled}
          className={clsx(
            "w-4 h-4 accent-input bg-input cursor-pointer",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        />
        {label && (
          <label
            htmlFor={name}
            className={clsx(
              "text-sm cursor-pointer select-none",
              disabled ? "opacity-60" : "text-white"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }

  // ✅ Default text/email/password inputs
  return (
    <div className="flex flex-col gap-1 w-full max-w-sm">
      {label && (
        <label
          htmlFor={name}
          className={clsx(
            "text-sm font-medium",
            variant === "error" ? "text-red-500" : "text-input"
          )}
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value as string}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(baseStyles, variants[variant])}
      />

      {variant === "error" && error && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
