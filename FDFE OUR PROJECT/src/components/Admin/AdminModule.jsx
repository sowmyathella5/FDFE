import React, { useState } from 'react';
import { 
  PlusCircle, 
  Users, 
  LayoutDashboard, 
  Settings,
  CalendarDays,
  Sparkles,
  Search,
  BarChart3,
  Award
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

const AdminModule = () => {
  const { currentUser, logout, events, users, registrations, createEvent } = useAppContext();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [formData, setFormData] = useState({ title: '', date: '', description: '' });
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    createEvent(formData);
    setFormData({ title: '', date: '', description: '' });
    setActiveTab('manage');
  };

  const getEventRegistrations = (eventId) => {
    const eventRegs = registrations.filter(r => r.eventId === eventId);
    return eventRegs.map(r => users.find(u => u.id === r.userId));
  };

  const adminMenuItems = [
    { id: 'dashboard', label: 'Summary', icon: LayoutDashboard },
    { id: 'manage', label: 'Manage Events', icon: CalendarDays },
    { id: 'attendees', label: 'Attendees Directory', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'certificates', label: 'Certificates Central', icon: Award },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="layout-wrapper">
      <Sidebar 
        brandIcon={Sparkles} 
        brandName="EventFlow" 
        subtitle="Admin Menu"
        menuItems={adminMenuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
      />

      <main className="layout-main">
        <header className="dashboard-header fade-in">
          <div>
            <h2 className="mb-1" style={{ fontSize: '1.75rem', margin: 0 }}>
              {activeTab === 'dashboard' && 'Admin Summary'}
              {activeTab === 'manage' && 'Manage Events'}
              {activeTab === 'attendees' && 'Attendees Directory'}
              {activeTab === 'analytics' && 'Platform Analytics'}
              {activeTab === 'certificates' && 'Manage Certificates'}
              {activeTab === 'settings' && 'App Settings'}
            </h2>
          </div>
          <div className="flex-row align-center glass-card" style={{ padding: '0.5rem 1rem', width: 'auto', borderRadius: '50px' }}>
            <span style={{color: 'var(--text-muted)', fontWeight: 500}}>Admin: {currentUser?.username}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {currentUser?.username.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="dashboard-content fade-in">
          {activeTab === 'dashboard' && (
            <div>
              <div className="events-grid mb-4">
                <div className="glass-card flex-row align-center justify-between" style={{ padding: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>{events.length}</h3>
                    <p className="text-muted">Total Events</p>
                  </div>
                  <div className="role-icon"><CalendarDays size={32} /></div>
                </div>
                <div className="glass-card flex-row align-center justify-between" style={{ padding: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontSize: '2rem', color: 'var(--success)' }}>{registrations.length}</h3>
                    <p className="text-muted">Total Registrations</p>
                  </div>
                  <div className="role-icon" style={{ background: 'rgba(5, 150, 105, 0.1)', color: 'var(--success)' }}><Users size={32} /></div>
                </div>
              </div>
              <h3 className="mb-2">System Status</h3>
              <div className="glass-card" style={{ maxWidth: '100%', padding: '1.5rem' }}>
                <p className="text-muted text-center" style={{ padding: '2rem' }}>All platform systems are operational.</p>
              </div>
            </div>
          )}

          {activeTab === 'manage' && (
            <div>
              <div className="flex-row justify-between mb-4 mt-2">
                <div className="flex-row glass-card align-center" style={{ padding: '0.5rem 1rem', width: '300px', borderRadius: '12px' }}>
                  <Search size={18} color="var(--text-muted)" />
                  <input type="text" placeholder="Search events..." style={{ border: 'none', outline: 'none', background: 'transparent', flex: 1, fontFamily: 'Outfit' }} />
                </div>
              </div>

              <div className="glass-card large mb-4">
                <h3 className="mb-4">Create New Event</h3>
                <form onSubmit={handleCreateEvent}>
                  <div className="flex-row">
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Event Title</label>
                      <input required type="text" className="form-control" placeholder="e.g. React Workshop" 
                        value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                    </div>
                    <div className="form-group" style={{ flex: 1 }}>
                      <label>Date</label>
                      <input required type="date" className="form-control" 
                        value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea required className="form-control" placeholder="What is this event about?" rows="3"
                      value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{marginTop: '0.5rem'}}>
                    <PlusCircle size={18} /> Add Event
                  </button>
                </form>
              </div>

              <h3>Current Events Array</h3>
              {events.length === 0 ? (
                <p className="text-muted mt-2">No events found. Create one above!</p>
              ) : (
                <div className="events-grid mt-2">
                  {events.map(event => {
                    const enrolledUsers = getEventRegistrations(event.id);
                    return (
                      <div key={event.id} className="event-card">
                        <div className="flex-row justify-between align-center">
                          <span className="event-title">{event.title}</span>
                          <span className="badge badge-success">{event.status}</span>
                        </div>
                        <p className="text-muted" style={{ fontSize: '0.9rem' }}>{event.date}</p>
                        <span className="event-meta mt-2">
                          <Users size={16} /> 
                          {enrolledUsers.length} Enrolled Student(s)
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'attendees' && (
            <div className="glass-card large">
              <h3 className="mb-4">Global Registrations Overview</h3>
              {events.map(event => {
                const enrolledUsers = getEventRegistrations(event.id);
                return (
                  <div key={event.id} className="mb-4">
                    <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{event.title}</h4>
                    {enrolledUsers.length > 0 ? (
                      <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '12px', padding: '1rem', border: '1px solid var(--surface-border)' }}>
                        {enrolledUsers.map(u => (
                          <div key={u.id} className="flex-row align-center justify-between" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--surface-border)' }}>
                            <span style={{ fontWeight: 600 }}>{u.username}</span>
                            <span className="text-muted" style={{ fontSize: '0.9rem' }}>Role: {u.role}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted" style={{ fontSize: '0.9rem' }}>No student registered yet.</p>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="glass-card large text-center">
              <BarChart3 size={48} color="rgba(79, 70, 229, 0.4)" className="mb-2" />
              <h3 className="mb-2">Engagement Analytics</h3>
              <p className="text-muted">Track attendance rate, demographic distributions, and event popularity here. Reporting module coming soon.</p>
            </div>
          )}

          {activeTab === 'certificates' && (
            <div className="glass-card large text-center">
              <Award size={48} color="rgba(79, 70, 229, 0.4)" className="mb-2" />
              <h3 className="mb-2">Event Certificates</h3>
              <p className="text-muted">Bulk generate post-attendance certificates for students. Generation engine coming soon.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-card text-center" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <Settings size={48} color="var(--text-muted)" className="mb-2" />
              <h3>Admin Settings</h3>
              <p className="text-muted mt-2">Manage your profile preferences and system limits here.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminModule;
