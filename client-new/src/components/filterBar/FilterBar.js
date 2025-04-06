import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import './FilterBar.css'; // Import external CSS

const FilterBar = ({ onSearch }) => {
  const [filtersMeta, setFiltersMeta] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [value, setValue] = useState('');
  const [operator, setOperator] = useState('=');
  const [combinator, setCombinator] = useState('AND');
  const [activeFilters, setActiveFilters] = useState([]);

  useEffect(() => {
    
      setFiltersMeta([
        {
          "key_name": "student.roll_no",
          "label": "Student Roll",
          "data_type": "string",
          "function_name": "text",
          "applicable_pages": ["form_list"],
          "options": null,
          "api_url": null
        },
        {
          "key_name": "student.department.name",
          "label": "Department",
          "data_type": "string",
          "function_name": "text",
          "applicable_pages": ["form_list"],
          "options": null,
          "api_url": null
        },
        {
          "key_name": "rcpg_count",
          "label": "RCPG Count",
          "data_type": "number",
          "function_name": "number",
          "applicable_pages": ["form_list"],
          "options": null,
          "api_url": null
        },
        {
          "key_name": "status",
          "label": "Form Status",
          "data_type": "select",
          "function_name": "select",
          "applicable_pages": ["form_list"],
          "options": ["Approved", "Pending", "Rejected"],
          "api_url": null
        },
        {
          "key_name": "submitted_at",
          "label": "Submission Date",
          "data_type": "date",
          "function_name": "date",
          "applicable_pages": ["form_list"],
          "options": null,
          "api_url": null
        }
      ]
      );
   
  }, []);

  const addFilter = () => {
    if (!selectedFilter || !value) return;
    setActiveFilters([
      ...activeFilters,
      { key: selectedFilter, op: operator, value },
    ]);
    setValue('');
  };

  const removeFilter = (index) => {
    setActiveFilters(activeFilters.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    const query = {
      combine: combinator,
      conditions: activeFilters,
    };
    onSearch(query);
  };

  return (
    <div className="filter-bar">
      <div className="filter-row">
        <select
          className="filter-select"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
        >
          <option value="">Select Filter</option>
          {filtersMeta.map((f) => (
            <option key={f.key_name} value={f.key_name}>
              {f.label}
            </option>
          ))}
        </select>

        <select
          className="filter-operator"
          value={operator}
          onChange={(e) => setOperator(e.target.value)}
        >
          <option value="=">EQUAL</option>
          <option value="LIKE">LIKE</option>
          <option value="!=">NOT EQUAL</option>
          <option value="<">SMALLER THAN</option>
          <option value=">">GREATER THAN</option>
          <option value="<=">SMALLER THAN EQUAL TO</option>
          <option value=">=">GREATER THAN EQUAL TO</option>
        </select>

        <input
          type="text"
          className="filter-input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter value"
        />

        <button className="filter-add" onClick={addFilter}>
          Add Filter
        </button>

        <select
          className="filter-combinator"
          value={combinator}
          onChange={(e) => setCombinator(e.target.value)}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>

        <button className="filter-search" onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="active-filters">
        {activeFilters.map((f, i) => (
          <div key={i} className="filter-chip">
            {`${f.key} ${f.op} ${f.value}`}
            <span className="remove-filter" onClick={() => removeFilter(i)}>
              &times;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;
