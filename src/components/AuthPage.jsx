import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, User, ArrowLeft, Loader2 } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const AuthPage = () => {
  const { type } = useParams(); // 'login' or 'signup'
  const isLogin = type === 'login';
  const navigate = useNavigate();
  const { login, signup } = useAppContext();

  const [role, setRole] = useState('user'); // 'admin' | 'user'
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate async network request
    await new Promise(res => setTimeout(res, 800));

    if (isLogin) {
      const success = login(formData.username, formData.password, role);
      if (success) {
        navigate(`/${role}`);
      } else {
        setError('Invalid credentials or role mismatch.');
      }
    } else {
      const success = signup(formData.username, formData.password, role);
      if (success) {
        navigate(`/${role}`);
      } else {
        setError('User already exists.');
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="main-content">
      <div className="glass-card fade-in" style={{ maxWidth: '450px' }}>
        <button 
          className="btn btn-secondary mb-4" 
          onClick={() => navigate('/')}
          style={{ padding: '0.5rem', background: 'transparent', border: 'none' }}
        >
          <ArrowLeft size={20} /> Back
        </button>

        <h2 className="text-center mb-1">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="subtitle text-center">Please select your role and enter your details.</p>

        {error && <div className="mb-4 text-center" style={{color: 'var(--danger)', background: 'rgba(239, 68, 68, 0.1)', padding:'0.75rem', borderRadius:'8px'}}>{error}</div>}

        <div className="role-cards">
          <div 
            className={`role-card ${role === 'user' ? 'selected' : ''}`}
            onClick={() => setRole('user')}
          >
            <div className="role-icon"><User size={28} /></div>
            <span style={{fontWeight: 600}}>User</span>
          </div>
          <div 
            className={`role-card ${role === 'admin' ? 'selected' : ''}`}
            onClick={() => setRole('admin')}
          >
            <div className="role-icon"><ShieldCheck size={28} /></div>
            <span style={{fontWeight: 600}}>Admin</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              required
              type="text" 
              className="form-control" 
              placeholder="Enter username" 
              value={formData.username}
              onChange={e => setFormData({...formData, username: e.target.value})}
            />
          </div>
          <div className="form-group mb-4">
            <label>Password</label>
            <input 
              required
              type="password" 
              className="form-control" 
              placeholder="Enter password" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="text-center mt-4">
          <p style={{color: 'var(--text-muted)'}}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span 
              style={{color: 'var(--primary-color)', cursor: 'pointer', fontWeight: 600}}
              onClick={() => {
                setError('');
                navigate(`/auth/${isLogin ? 'signup' : 'login'}`);
              }}
            >
              {isLogin ? 'Sign up' : 'Login'}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
