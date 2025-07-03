import React from "react";

interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  value,
  onValueChange,
  children,
  placeholder = "Select an option",
  className = "",
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value)}
      className={`w-full px-4 py-2 text-sm border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400 ${className}`}
    >
      {placeholder && !value && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  );
};

interface SelectItemProps {
  value: string;
  placeholder?: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({ placeholder, value, children }) => (
  <option value={value}>{children}</option>
);