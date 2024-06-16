/* eslint-disable react/prop-types */

import { useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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
      <TextField
        id="filled-textarea"
        label="Search by title"
        placeholder="Search"
        multiline
        variant="filled"
        value={searchInput}
        onChange={handleSearch}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">All todos</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="All"
          value={filterByComplete}
          onChange={handleFilterChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="complete">Complete</MenuItem>
          <MenuItem value="incomplete">Incomplete</MenuItem>
        </Select>
      </FormControl>
      {children(filteredTodos)}
    </div>
  );
}

export default Filter;