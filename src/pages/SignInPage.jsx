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
      background: '#050505',
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
          padding: '10px 20px',
          background: 'rgba(30, 64, 175, 0.15)',
          border: '1px solid rgba(30, 64, 175, 0.3)',
          borderRadius: '6px',
          color: '#ffffff',
          fontSize: '14px',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(30, 64, 175, 0.25)';
          e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(30, 64, 175, 0.15)';
          e.currentTarget.style.borderColor = 'rgba(30, 64, 175, 0.3)';
        }}
      >
        <ArrowLeft size={16} />
        Back
      </button>

      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '48px',
        background: 'rgba(10, 10, 10, 0.5)',
        border: '1px solid rgba(30, 64, 175, 0.2)',
        borderRadius: '8px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '40px', marginBottom: '16px' }}>🎤</div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#ffffff',
            marginBottom: '8px',
            letterSpacing: '-0.5px',
          }}>
            Voice AI
          </h1>
          <p style={{ fontSize: '14px', color: '#b0b0b0', fontWeight: '400' }}>
            Welcome back to your AI communication hub
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            padding: '12px 16px',
            marginBottom: '20px',
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '6px',
            color: '#fca5a5',
            fontSize: '13px',
            fontWeight: '500',
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
              color: '#b0b0b0',
              fontWeight: '600',
              marginBottom: '8px',
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#3b82f6',
              }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 40px',
                  background: 'rgba(30, 64, 175, 0.05)',
                  border: '1px solid rgba(30, 64, 175, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '400',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(30, 64, 175, 0.5)';
                  e.target.style.boxShadow = '0 0 12px rgba(30, 64, 175, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(30, 64, 175, 0.2)';
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
              color: '#b0b0b0',
              fontWeight: '600',
              marginBottom: '8px',
              letterSpacing: '0.3px',
              textTransform: 'uppercase',
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#3b82f6',
              }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                style={{
                  width: '100%',
                  padding: '12px 40px 12px 40px',
                  background: 'rgba(30, 64, 175, 0.05)',
                  border: '1px solid rgba(30, 64, 175, 0.2)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '400',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.border = '1px solid rgba(30, 64, 175, 0.5)';
                  e.target.style.boxShadow = '0 0 12px rgba(30, 64, 175, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.border = '1px solid rgba(30, 64, 175, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#3b82f6',
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
              <span style={{ color: '#b0b0b0', fontWeight: '400' }}>Remember me</span>
            </label>
            <a href="#" style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
            onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
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
              padding: '12px 20px',
              background: isLoading ? 'rgba(30, 64, 175, 0.3)' : '#1e40af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              marginTop: '20px',
              letterSpacing: '0.3px',
              boxShadow: isLoading ? 'none' : '0 0 15px rgba(30, 64, 175, 0.2)',
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = '#3b82f6';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(30, 64, 175, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.background = '#1e40af';
                e.currentTarget.style.boxShadow = '0 0 15px rgba(30, 64, 175, 0.2)';
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
          color: '#b0b0b0',
          fontWeight: '400',
        }}>
          Don't have an account?{' '}
          <a href="#" style={{
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: '600',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => e.target.style.color = '#60a5fa'}
          onMouseLeave={(e) => e.target.style.color = '#3b82f6'}
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
}
