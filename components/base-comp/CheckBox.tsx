import React from "react";
import clsx from "clsx";

interface CheckBoxProps {
  label?: string;
  checked?: boolean; // Controlled usage
  defaultChecked?: boolean; // Uncontrolled usage
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  name?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled = false,
  name,
}) => {
  // If checked is provided but onChange isn’t, make it readonly to silence warning
  const readOnly = checked !== undefined && !onChange;

  return (
    <label
      className={clsx(
        "flex items-center gap-2 cursor-pointer select-none",
        disabled && "opacity-60 cursor-not-allowed"
      )}
    >
      <input
        id={name}
        name={name}
        type="checkbox"
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        className={clsx(
          "appearance-none w-5 h-5 border border-gray-400 rounded-md bg-transparent",
          "checked:bg-input checked:border-input checked:after:content-['✓']",
          "checked:after:text-white checked:after:text-sm checked:after:flex",
          "checked:after:items-center checked:after:justify-center transition-all duration-200"
        )}
      />
      {label && <span className="text-white text-sm">{label}</span>}
    </label>
  );
};

export default CheckBox;
