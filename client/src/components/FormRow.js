import React from "react";

const FormRow = ({ type, name, value, handleChange, placeholder }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        className="form-input"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormRow;
