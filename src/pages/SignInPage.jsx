import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function SignInPage({ onBack, onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        onSignIn();
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div style={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #050810 0%, #0f1a2a 25%, #1a2f4a 50%, #0f1a2a 75%, #050810 100%)',
      padding: '24px',
    }}>
      <button
        onClick={onBack}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px 20px',
          background: 'rgba(212, 175, 55, 0.15)',
          border: '1px solid rgba(212, 175, 55, 0.3)',
          borderRadius: '8px',
          color: '#f4e4c1',
          fontSize: '14px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          letterSpacing: '0.3px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(212, 175, 55, 0.25)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(212, 175, 55, 0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <ArrowLeft size={18} />
        Back
      </button>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '48px',
        background: 'rgba(15, 26, 42, 0.6)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(212, 175, 55, 0.2)',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎤</div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #d4af37, #f4e4c1)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '8px',
          }}>
            Voice AI
          </h1>
          <p style={{ fontSize: '14px', color: '#f5ede0', fontWeight: '300' }}>
            Welcome back to your AI communication hub
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            marginBottom: '20px',
            background: 'rgba(197, 113, 113, 0.15)',
            border: '1px solid rgba(197, 113, 113, 0.3)',
            borderRadius: '8px',
            color: '#d4a5a5',
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0.3px',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: 'rgba(212, 175, 55, 0.8)',
              fontWeight: '600',
              marginBottom: '8px',
              letterSpacing: '0.3px',
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#d4af37',
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '8px',
                  color: '#f5ede0',
                  fontSize: '14px',
                  fontWeight: '400',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(212, 175, 55, 0.5)';
                  e.target.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(212, 175, 55, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '12px',
              color: 'rgba(212, 175, 55, 0.8)',
              fontWeight: '600',
              marginBottom: '8px',
              letterSpacing: '0.3px',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#d4af37',
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '8px',
                  color: '#f5ede0',
                  fontSize: '14px',
                  fontWeight: '400',
                  transition: 'all 0.3s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(212, 175, 55, 0.5)';
                  e.target.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(212, 175, 55, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#d4af37',
                  cursor: 'pointer',
                  padding: '4px',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ cursor: 'pointer' }} />
              <span style={{ color: '#f5ede0', fontWeight: '300' }}>Remember me</span>
            </label>
            <a href="#" style={{
              color: '#d4af37',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#f4e4c1'}
            onMouseLeave={(e) => e.target.style.color = '#d4af37'}
            >
              Forgot?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px 20px',
              background: isLoading ? 'rgba(212, 175, 55, 0.3)' : 'linear-gradient(135deg, #d4af37, #f4e4c1)',
              color: isLoading ? '#d4af37' : '#050810',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '20px',
              letterSpacing: '0.5px',
              boxShadow: isLoading ? 'none' : '0 0 20px rgba(212, 175, 55, 0.4)',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)';
              }
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Sign Up Link */}
        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '13px',
          color: '#f5ede0',
          fontWeight: '300',
        }}>
          Don't have an account?{' '}
          <a href="#" style={{
            color: '#d4af37',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = '#f4e4c1'}
          onMouseLeave={(e) => e.target.style.color = '#d4af37'}
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
