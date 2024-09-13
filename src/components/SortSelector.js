// src/components/SortSelector.js

import React from 'react';

const SortSelector = ({ sortBy, setSortBy }) => {
  return (
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="priority">Sort by Priority</option>
      <option value="title">Sort by Title</option>
    </select>
  );
};

export default SortSelector;
