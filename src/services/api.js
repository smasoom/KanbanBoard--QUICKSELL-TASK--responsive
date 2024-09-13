// src/services/api.js

export const fetchData = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  