import React from "react";

interface InputFieldProps {
  label: string;
  type: string;
  value: string;
  error?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  value,
  error,
  onChange,
  placeholder,
  required = false,
}) => {
  return (
    <div className="input-field">
      <label className="input-label">
        {label}
        {required && <span className="required">*</span>}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`input ${error ? "input-error" : ""}`}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default InputField;
