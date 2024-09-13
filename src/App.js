import React, { useState, useEffect } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('');
  const [showSelectors, setShowSelectors] = useState(false); // State to toggle visibility

  useEffect(() => {
    // Fetching the data from API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleToggleSelectors = () => {
    setShowSelectors(!showSelectors); // Toggle the state
  };

  const getGroupedTickets = () => {
    let groupedTickets = {};

    if (groupBy === 'status') {
      tickets.forEach(ticket => {
        if (!groupedTickets[ticket.status]) groupedTickets[ticket.status] = [];
        groupedTickets[ticket.status].push(ticket);
      });
    } else if (groupBy === 'user') {
      tickets.forEach(ticket => {
        const user = users.find(u => u.id === ticket.userId);
        if (!groupedTickets[user.name]) groupedTickets[user.name] = [];
        groupedTickets[user.name].push(ticket);
      });
    } else if (groupBy === 'priority') {
      const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
      tickets.forEach(ticket => {
        const priorityLabel = priorityLabels[ticket.priority];
        if (!groupedTickets[priorityLabel]) groupedTickets[priorityLabel] = [];
        groupedTickets[priorityLabel].push(ticket);
      });
      groupedTickets = Object.fromEntries(
        Object.entries(groupedTickets).sort((a, b) => {
          const priorityOrder = ['Urgent', 'High', 'Medium', 'Low', 'No priority'];
          return priorityOrder.indexOf(a[0]) - priorityOrder.indexOf(b[0]);
        })
      );
    }

    return groupedTickets;
  };

  const sortTickets = (tickets) => {
    if (sortBy === 'priority') {
      return tickets.sort((a, b) => b.priority - a.priority);
    } else if (sortBy === 'title') {
      return tickets.sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const getIconForPriority = (priority) => {
    const icons = {
      'Urgent': '/assets/SVG - Urgent Priority colour.svg',
      'High': '/assets/Img - High Priority.svg',
      'Medium': '/assets/Img - Medium Priority.svg',
      'Low': '/assets/Img - Low Priority.svg',
      'No priority': '/assets/No-priority.svg'
    };
    return icons[priority] || '/assets/default-icon.svg'; // Fallback icon
  };

  const getIconForStatus = (status) => {
    const icons = {
      'Done': '/assets/Done.svg',
      'In progress': '/assets/in-progress.svg',
      'Not done': '/assets/Backlog.svg'
    };
    return icons[status] || '/assets/To-do.svg'; // Fallback icon
  };

  const groupedTickets = getGroupedTickets();

  return (
    <div className="App">
      <button className="toggle-btn" onClick={handleToggleSelectors}>
        <img src="/assets/Display.svg" alt="Toggle" className="toggle-icon" />
        {showSelectors ? 'Hide' : 'Display'}
      </button>

      {showSelectors && (
        <div className="selectors">
          <div className="selectors-item">
            <label htmlFor="groupBy">Group by:</label>
            <select id="groupBy" value={groupBy} onChange={handleGroupByChange}>
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="selectors-item">
            <label htmlFor="sortBy">Sort by:</label>
            <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
              <option value="">None</option>
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}

      <div className="kanban-board">
        {Object.keys(groupedTickets).map((group, index) => (
          <div key={index} className="kanban-column">
            <h3>{group}
              <div className="columnIcons">
                <img src="/assets/add.svg" alt="Add" className="toggle-icon" />
                <img src="/assets/3 dot menu.svg" alt="Options" className="toggle-icon" />
              </div>
            </h3>

            {sortTickets(groupedTickets[group]).map(ticket => (
              <div key={ticket.id} className="ticket">
                <img src={getIconForPriority(['No priority', 'Low', 'Medium', 'High', 'Urgent'][ticket.priority])} alt="Priority Icon" className="ticket-icon" />
                <img src={getIconForStatus(ticket.status)} alt="Status Icon" className="ticket-icon" />
                <p>{ticket.id}</p>
                <h4>{ticket.title}</h4>
                {groupBy === 'user' && (
                  <div className="user-name">Assigned to: {users.find(u => u.id === ticket.userId).name}</div>
                )}
                <p>{ticket.tag.join(', ')}</p>
                {/* Removed Status and Priority display as icons are added */}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer/>
    </div>
  );
};

export default App;
