// src/components/KanbanBoard.js

import React, { useEffect, useState } from 'react';
import Ticket from './Ticket';
import { PRIORITY_LABELS } from '../utils/constants';
import { fetchData } from '../services/api';

const KanbanBoard = ({ groupBy, sortBy }) => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchData();
        setTickets(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getData();
  }, []);

  const getGroupLabel = (ticket) => {
    switch (groupBy) {
      case 'status':
        return ticket.status;
      case 'user':
        return users.find((user) => user.id === ticket.userId)?.name || 'Unknown';
      case 'priority':
        return PRIORITY_LABELS[ticket.priority] || 'Unknown';
      default:
        return 'Unknown';
    }
  };

  const sortedTickets = [...tickets].sort((a, b) => {
    if (sortBy === 'priority') {
      return b.priority - a.priority;
    }
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const groupedTickets = sortedTickets.reduce((acc, ticket) => {
    const groupLabel = getGroupLabel(ticket);
    if (!acc[groupLabel]) acc[groupLabel] = [];
    acc[groupLabel].push(ticket);
    return acc;
  }, {});

  return (
    <div className="kanban-board">
      {Object.keys(groupedTickets).map((groupLabel) => (
        <div key={groupLabel} className="kanban-column">
          <h3>{groupLabel}</h3>
          {groupedTickets[groupLabel].map((ticket) => (
            <Ticket key={ticket.id} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
