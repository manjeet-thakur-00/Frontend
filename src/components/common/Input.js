import React from "react";

function Input({ type, placeholder, className, name, onChange, value, required }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className}
      name={name}
      onChange={onChange}
      value={value}
      required={required}
    />
  );
}

export default Input;
