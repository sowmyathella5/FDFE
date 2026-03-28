import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: '1', username: 'admin', password: 'password', role: 'admin' },
    { id: '2', username: 'user1', password: 'password', role: 'user' }
  ]);
  const [events, setEvents] = useState([
    { id: '101', title: 'React Summit', date: '2026-10-15', description: 'Advanced React patterns and performance.', status: 'upcoming' },
    { id: '102', title: 'Tech Innovation Fair', date: '2026-11-02', description: 'Explore the latest in tech.', status: 'upcoming' }
  ]);
  const [registrations, setRegistrations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (username, password, role) => {
    const user = users.find(u => u.username === username && u.password === password && u.role === role);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const signup = (username, password, role) => {
    if (users.find(u => u.username === username)) {
      return false; // User already exists
    }
    const newUser = { id: Date.now().toString(), username, password, role };
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const createEvent = (eventData) => {
    const newEvent = { ...eventData, id: Date.now().toString(), status: 'upcoming' };
    setEvents([...events, newEvent]);
  };

  const registerForEvent = (eventId) => {
    if (!currentUser) return;
    const exists = registrations.find(r => r.eventId === eventId && r.userId === currentUser.id);
    if (!exists) {
      setRegistrations([...registrations, { id: Date.now().toString(), eventId, userId: currentUser.id }]);
    }
  };

  return (
    <AppContext.Provider value={{
      users, events, registrations, currentUser,
      login, signup, logout, createEvent, registerForEvent
    }}>
      {children}
    </AppContext.Provider>
  );
};
