import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Users, Home, Info, Star, LogIn } from 'lucide-react';
import Sidebar from './Sidebar';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');

  const navItems = [
    { id: 'home', label: 'Welcome', icon: Home },
    { id: 'features', label: 'Platform Features', icon: Star },
    { id: 'about', label: 'About Us', icon: Info },
  ];

  const handleLoginClick = () => navigate('/auth/login');
  const handleSignupClick = () => navigate('/auth/signup');

  return (
    <div className="layout-wrapper">
      <Sidebar 
        brandIcon={Sparkles}
        brandName="EventFlow"
        brandColor="var(--primary-color)"
        subtitle="Public Portal"
        menuItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onFooterClick={handleLoginClick}
        footerLabel="Portal Login"
        footerIcon={LogIn}
        footerColor="var(--text-main)"
      />
      
      <main className="layout-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        {activeTab === 'home' && (
          <div className="glass-card text-center fade-in large" style={{ background: 'rgba(255,255,255,0.7)', padding: '4rem' }}>
            <div className="mb-4 flex-row justify-center">
              <div style={{ background: 'rgba(79, 70, 229,0.1)', padding:'1rem', borderRadius:'50%' }}>
                <Sparkles size={48} color="var(--primary-color)" />
              </div>
            </div>
            <h1 className="gradient-text">Event Registration</h1>
            <p className="subtitle mx-auto" style={{ maxWidth: '600px' }}>
              Secure, seamless, and intelligent event management platform for both organizers and attendees. Manage your next big experience here.
            </p>
            
            <div className="flex-row justify-center mt-4 pt-2">
              <button className="btn btn-secondary" onClick={handleLoginClick}>
                Login to Portal
              </button>
              <button className="btn btn-primary" onClick={handleSignupClick}>
                Create Account <ArrowRight size={18} />
              </button>
            </div>
            
            <div className="flex-row justify-center mt-4 pt-4" style={{ gap: '3rem', color: 'var(--text-muted)' }}>
              <div className="flex-row align-center" style={{ gap: '0.75rem' }}>
                <ShieldCheck size={24} color="var(--secondary-color)" />
                <span style={{ fontWeight: 600 }}>Secure Admin Access</span>
              </div>
              <div className="flex-row align-center" style={{ gap: '0.75rem' }}>
                <Users size={24} color="var(--primary-color)" />
                <span style={{ fontWeight: 600 }}>Student Dashboards</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="glass-card fade-in text-center">
            <Star size={48} color="var(--primary-color)" className="mb-2 mx-auto" />
            <h2 className="mb-2">Platform Features</h2>
            <p className="text-muted">Explore the amazing things our platform can do. Advanced routing, dynamic validation, multi-step layouts, and more.</p>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="glass-card fade-in text-center">
            <Info size={48} color="var(--primary-color)" className="mb-2 mx-auto" />
            <h2 className="mb-2">About Us</h2>
            <p className="text-muted">We build premium wizard-driven registration apps. Enjoy the cutting-edge glassmorphism interfaces and fluid UX.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default LandingPage;
