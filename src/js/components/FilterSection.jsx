import React from 'react';

const FilterSection = ({ label, value, onChange, options }) => {
  return (
    <div className="filter-section">
      <label className="filter-section__label">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className="filter-section__select"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterSection;