import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle,
  LayoutDashboard,
  User,
  Sparkles,
  MapPin,
  Clock,
  Award,
  Bell,
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Sidebar';

const EventRegistrationWizard = ({ event, onCancel, onComplete }) => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ phone: '', source: 'Social Media', ticketType: 'Standard' });

  const steps = [
    { id: 1, title: 'Attendee Info', icon: ClipboardList, desc: 'Contact details' },
    { id: 2, title: 'Session & Ticket', icon: CreditCard, desc: 'Pick your track' },
    { id: 3, title: 'Confirm', icon: CheckCircle2, desc: 'Review everything' }
  ];

  const handleFinish = async () => {
    setLoading(true);
    await new Promise(res => setTimeout(res, 800)); // validate network wait
    onComplete(event.id);
  };

  return (
    <div style={{ display: 'flex', background: 'rgba(255,255,255,0.7)', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', border: '1px solid var(--surface-border)' }}>
      {/* Wizard Mini Sidebar */}
      <div style={{ width: '280px', background: 'rgba(255,255,255,0.9)', padding: '2rem', borderRight: '1px solid rgba(203,213,225,0.6)' }}>
        <button className="btn btn-secondary mb-4" onClick={onCancel} style={{ padding: '0.4rem 0.8rem', fontSize: '0.9rem', width: '100%', background: 'transparent' }}>
          <ArrowLeft size={16} /> Cancel Form
        </button>
        <h4 className="mb-2" style={{ color: 'var(--primary-color)' }}>{event.title}</h4>
        <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>{event.date}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {steps.map(s => {
            const isActive = step === s.id;
            const isCompleted = step > s.id;
            return (
              <div key={s.id} style={{ display: 'flex', gap: '1rem', opacity: isActive || isCompleted ? 1 : 0.5 }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: isActive ? 'var(--primary-color)' : (isCompleted ? 'var(--success)' : 'rgba(203,213,225,0.5)'), color: isActive || isCompleted ? 'white' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {isCompleted ? <CheckCircle2 size={18} /> : <s.icon size={18} />}
                </div>
                <div>
                  <h5 style={{ fontWeight: 600, color: isActive ? 'var(--primary-color)' : 'var(--text-main)' }}>{s.title}</h5>
                  <p className="text-muted" style={{ fontSize: '0.8rem' }}>{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Wizard Content */}
      <div style={{ flex: 1, padding: '3rem', background: 'white' }}>
        {step === 1 && (
          <div className="fade-in">
            <h2 className="mb-1">Attendee Information</h2>
            <p className="text-muted mb-4">Please provide your contact details specifically for this event.</p>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" className="form-control" placeholder="+1 (555) 000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="form-group mb-4">
              <label>How did you hear about us?</label>
              <select className="form-control" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})}>
                <option>Social Media</option>
                <option>Friend / Colleague</option>
                <option>Email Newsletter</option>
              </select>
            </div>
            <div className="flex-row justify-between mt-4">
              <div />
              <button className="btn btn-primary" onClick={() => setStep(2)}>Next Step <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <h2 className="mb-1">Ticket & Session</h2>
            <p className="text-muted mb-4">Choose your preferred access tier.</p>
            <div className="role-cards" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
              <div className={`role-card ${formData.ticketType === 'Standard' ? 'selected' : ''}`} onClick={() => setFormData({...formData, ticketType: 'Standard'})} style={{ padding: '1.5rem 1rem' }}>
                <h4 className="mb-1">Standard</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Basic event access</p>
              </div>
              <div className={`role-card ${formData.ticketType === 'VIP' ? 'selected' : ''}`} onClick={() => setFormData({...formData, ticketType: 'VIP'})} style={{ padding: '1.5rem 1rem' }}>
                <h4 className="mb-1 text-primary">VIP Pass</h4>
                <p className="text-muted" style={{ fontSize: '0.85rem' }}>Includes dinner & networking</p>
              </div>
            </div>
            <div className="flex-row justify-between">
              <button className="btn btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button className="btn btn-primary" onClick={() => setStep(3)}>Review Details <ChevronRight size={18} /></button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="fade-in">
            <h2 className="mb-1">Final Review</h2>
            <p className="text-muted mb-4">Verify everything looks correct before submitting.</p>
            <div style={{ background: 'rgba(248,250,252,1)', border: '1px solid var(--surface-border)', padding: '1.5rem', borderRadius: '16px', marginBottom: '2rem' }}>
              <div className="flex-row justify-between mb-2 pb-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <span className="text-muted">Event Target</span>
                <span style={{ fontWeight: 600, color: 'var(--primary-color)' }}>{event.title}</span>
              </div>
              <div className="flex-row justify-between mb-2 pb-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <span className="text-muted">Phone Number</span>
                <span style={{ fontWeight: 600 }}>{formData.phone || 'Not Provided'}</span>
              </div>
              <div className="flex-row justify-between mb-2 pb-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <span className="text-muted">Lead Source</span>
                <span style={{ fontWeight: 600 }}>{formData.source}</span>
              </div>
              <div className="flex-row justify-between">
                <span className="text-muted">Ticket Tier</span>
                <span style={{ fontWeight: 600, color: 'var(--success)' }}>{formData.ticketType} Pass</span>
              </div>
            </div>
            <div className="flex-row justify-between">
              <button className="btn btn-secondary" onClick={() => setStep(2)} disabled={loading}>Back</button>
              <button className="btn btn-primary" onClick={handleFinish} disabled={loading} style={{ background: 'var(--success)', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.3)' }}>
                {loading ? <Loader2 className="animate-spin" /> : 'Confirm Registration'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


const UserModule = () => {
  const { currentUser, logout, events, registrations, registerForEvent } = useAppContext();
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [registeringEventId, setRegisteringEventId] = useState(null);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleStartRegister = (eventId) => {
    setRegisteringEventId(eventId);
  };

  const handleCompleteRegister = (eventId) => {
    registerForEvent(eventId);
    setRegisteringEventId(null);
    setActiveTab('registered'); // auto switch to "My Registrations" upon success
  };

  const isRegistered = (eventId) => {
    return registrations.some(r => r.eventId === eventId && r.userId === currentUser.id);
  };

  const registeredEvents = events.filter(e => isRegistered(e.id));
  const activeEventToRegister = events.find(e => e.id === registeringEventId);

  const userMenuItems = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'browse', label: 'Browse Events', icon: Calendar },
    { id: 'registered', label: 'My Registrations', icon: CheckCircle },
    { id: 'certificates', label: 'My Certificates', icon: Award },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile Settings', icon: User },
  ];

  return (
    <div className="layout-wrapper">
      <Sidebar 
        brandIcon={Sparkles} 
        brandName="StudentPortal" 
        brandColor="var(--secondary-color)"
        subtitle="Main Menu"
        menuItems={userMenuItems}
        activeTab={activeTab}
        setActiveTab={(tab) => { setActiveTab(tab); setRegisteringEventId(null); }}
        onFooterClick={handleLogout}
      />

      <main className="layout-main">
        <header className="dashboard-header fade-in">
          <div>
            <h2 className="mb-1" style={{ fontSize: '1.75rem', margin: 0 }}>
              {registeringEventId && 'Event Setup Wizard'}
              {!registeringEventId && activeTab === 'dashboard' && 'Welcome Back,'}
              {!registeringEventId && activeTab === 'browse' && 'Upcoming Events'}
              {!registeringEventId && activeTab === 'registered' && 'Event Confirmations'}
              {!registeringEventId && activeTab === 'certificates' && 'Earned Certificates'}
              {!registeringEventId && activeTab === 'notifications' && 'Inbox & Alerts'}
              {!registeringEventId && activeTab === 'profile' && 'User Profile'}
            </h2>
            {!registeringEventId && activeTab === 'dashboard' && <p className="text-muted mb-0" style={{ fontSize: '1.25rem', fontWeight: 600 }}>{currentUser?.username}</p>}
            {registeringEventId && <p className="text-muted mb-0">Follow the steps to secure your ticket.</p>}
          </div>
          <div className="flex-row align-center glass-card" style={{ padding: '0.5rem 1rem', width: 'auto', borderRadius: '50px' }}>
            <span style={{color: 'var(--text-muted)', fontWeight: 500}}>Rank: Explorer</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--secondary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              {currentUser?.username.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="dashboard-content fade-in">
          {registeringEventId ? (
            <EventRegistrationWizard 
              event={activeEventToRegister} 
              onCancel={() => setRegisteringEventId(null)}
              onComplete={handleCompleteRegister}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div>
                  <div className="events-grid mb-4">
                    <div className="glass-card flex-row align-center justify-between" style={{ padding: '1.5rem', borderColor: 'rgba(79, 70, 229, 0.4)' }}>
                      <div>
                        <h3 style={{ fontSize: '2rem', color: 'var(--primary-color)' }}>{registeredEvents.length}</h3>
                        <p className="text-muted">Enrolled Events</p>
                      </div>
                      <div className="role-icon"><CheckCircle size={32} /></div>
                    </div>
                    <div className="glass-card flex-row align-center justify-between" style={{ padding: '1.5rem' }}>
                      <div>
                        <h3 style={{ fontSize: '2rem', color: 'var(--text-main)' }}>{events.length}</h3>
                        <p className="text-muted">Available to Join</p>
                      </div>
                      <div className="role-icon" style={{ background: 'rgba(0,0,0,0.05)', color: 'var(--text-muted)' }}><Calendar size={32} /></div>
                    </div>
                  </div>

                  <h3 className="mb-2">Your Next Event</h3>
                  {registeredEvents.length > 0 ? (
                    <div className="glass-card large" style={{ background: 'rgba(79, 70, 229, 0.05)', borderColor: 'var(--primary-color)' }}>
                      <div className="flex-row justify-between align-center mb-2">
                        <h2 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--primary-color)' }}>{registeredEvents[0].title}</h2>
                        <span className="badge badge-primary">Starts Soon</span>
                      </div>
                      <p className="mb-4" style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: '600px' }}>{registeredEvents[0].description}</p>
                      
                      <div className="flex-row" style={{ gap: '2rem' }}>
                        <div className="flex-row align-center text-muted"><Calendar size={18} style={{ marginRight: '0.5rem' }} /> {registeredEvents[0].date}</div>
                        <div className="flex-row align-center text-muted"><Clock size={18} style={{ marginRight: '0.5rem' }} /> 09:00 AM</div>
                        <div className="flex-row align-center text-muted"><MapPin size={18} style={{ marginRight: '0.5rem' }} /> Main Auditorium</div>
                      </div>
                    </div>
                  ) : (
                    <div className="glass-card large text-center flex-column align-center justify-center" style={{ minHeight: '200px' }}>
                      <Calendar size={48} color="rgba(203, 213, 225, 0.8)" className="mb-2" />
                      <p className="text-muted mt-2">You don't have any upcoming events.</p>
                      <button className="btn btn-primary mt-4" onClick={() => setActiveTab('browse')}>Browse Events</button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'browse' && (
                <div>
                  <p className="subtitle mb-4">Discover and register for new events happening around you.</p>
                  
                  {events.length === 0 ? (
                    <p className="text-muted text-center mt-4 glass-card large">No events available at the moment.</p>
                  ) : (
                    <div className="events-grid">
                      {events.map(event => {
                        const registered = isRegistered(event.id);
                        return (
                          <div key={event.id} className="event-card">
                            <div className="flex-row justify-between align-center">
                              <span className="event-title">{event.title}</span>
                              <span className="badge badge-primary">{event.status}</span>
                            </div>
                            <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>{event.description}</p>
                            <span className="event-meta">
                              <Calendar size={16} /> {event.date}
                            </span>
                            
                            <div style={{marginTop: 'auto', paddingTop: '1rem'}}>
                              {registered ? (
                                <button className="btn btn-secondary" disabled style={{width: '100%', borderColor: 'var(--success)', color: 'var(--success)'}}>
                                  <CheckCircle size={16} style={{marginRight: '0.5rem'}} /> Enrolled
                                </button>
                              ) : (
                                <button className="btn btn-primary" style={{width: '100%'}} onClick={() => handleStartRegister(event.id)}>
                                  Join Now
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'registered' && (
                <div>
                  <p className="subtitle mb-4">Events you are currently officially enrolled in.</p>
                  
                  {registeredEvents.length === 0 ? (
                    <div className="text-center glass-card large" style={{padding: '3rem'}}>
                      <CheckCircle size={48} color="rgba(203, 213, 225, 0.8)" style={{marginBottom: '1rem'}} />
                      <p className="text-muted">You haven't registered for any events yet.</p>
                      <button className="btn btn-primary mt-4" onClick={() => setActiveTab('browse')}>
                        Start Exploring
                      </button>
                    </div>
                  ) : (
                    <div className="events-grid">
                      {registeredEvents.map(event => (
                        <div key={event.id} className="event-card" style={{borderColor: 'rgba(5, 150, 105, 0.4)', background: 'rgba(5, 150, 105, 0.02)'}}>
                          <div className="flex-row justify-between align-center">
                            <span className="event-title">{event.title}</span>
                          </div>
                          <p style={{color: 'var(--text-muted)', fontSize: '0.95rem'}}>{event.description}</p>
                          <span className="event-meta mb-2">
                            <Calendar size={16} /> {event.date}
                          </span>
                          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 600, fontSize: '0.9rem', background: 'rgba(5, 150, 105, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px', justifyContent: 'center' }}>
                            <CheckCircle size={16} /> Ticket Confirmed
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="glass-card large text-center">
                  <Award size={48} color="rgba(236, 72, 153, 0.4)" className="mb-2" />
                  <h3 className="mb-2">Your Credentials</h3>
                  <p className="text-muted">Digital certificates for events you have attended will appear here. No certificates available right now.</p>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="glass-card large text-center">
                  <Bell size={48} color="rgba(236, 72, 153, 0.4)" className="mb-2" />
                  <h3 className="mb-2">Update Center</h3>
                  <p className="text-muted">You're all caught up! Event reminders and app notifications will show up here.</p>
                </div>
              )}

              {activeTab === 'profile' && (
                 <div className="glass-card text-center text-muted" style={{ maxWidth: '400px', margin: '0 auto' }}>
                  <User size={48} className="mb-2" />
                  <h3>User Settings</h3>
                  <p className="mt-2">Update your personal information securely. Coming soon.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserModule;
