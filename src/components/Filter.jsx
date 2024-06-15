/* eslint-disable react/prop-types */

import { useState, useMemo } from 'react';

function Filter({ todos, children }) {
  const [searchInput, setSearchInput] = useState('');
  const [filterByComplete, setFilterByComplete] = useState('all');

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterByComplete(event.target.value);
  };

  const filteredTodos = useMemo(() => {
    let filtered = todos;
    if (searchInput) {
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (filterByComplete === 'complete') {
      filtered = filtered.filter(todo => todo.isComplete);
    } else if (filterByComplete === 'incomplete') {
      filtered = filtered.filter(todo => !todo.isComplete);
    }
    return filtered;
  }, [searchInput, filterByComplete, todos]);

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Search by title"
        value={searchInput}
        onChange={handleSearch}
        className="filter-input"
      />
      <select
        value={filterByComplete}
        onChange={handleFilterChange}
        className="filter-select"
      >
        <option value="all">All</option>
        <option value="complete">Complete</option>
        <option value="incomplete">Incomplete</option>
      </select>
      {children(filteredTodos)}
    </div>
  );
}

export default Filter;