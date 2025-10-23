import React, { useState } from 'react';
import { ArrowRight, Phone, Zap, BarChart3, Brain, Shield, Headphones, Check } from 'lucide-react';

export default function LandingPage({ onSignInClick }) {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #050810 0%, #0f1a2a 25%, #1a2f4a 50%, #0f1a2a 75%, #050810 100%)' }}>
      {/* Navigation Bar */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 48px',
        background: 'rgba(15, 26, 42, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontSize: '28px', fontWeight: '700', background: 'linear-gradient(135deg, #d4af37, #f4e4c1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          🎤 Voice AI
        </div>
        <button
          onClick={onSignInClick}
          style={{
            padding: '12px 28px',
            borderRadius: '8px',
            border: '2px solid #d4af37',
            background: 'rgba(212, 175, 55, 0.15)',
            color: '#f4e4c1',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.5px',
            boxShadow: '0 0 12px rgba(212, 175, 55, 0.25)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.25)';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.25)';
          }}
        >
          Sign In
        </button>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '120px 48px',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(212,175,55,0.1) 0%, transparent 50%)',
      }}>
        <h1 style={{
          fontSize: '56px',
          fontWeight: '800',
          marginBottom: '24px',
          background: 'linear-gradient(135deg, #d4af37, #f4e4c1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-1px',
        }}>
          Transform Your Communication
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#f5ede0',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px',
          lineHeight: '1.6',
          fontWeight: '300',
        }}>
          Harness the power of AI-driven voice calling to revolutionize customer engagement and boost your business efficiency.
        </p>
        <button
          onClick={onSignInClick}
          style={{
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #d4af37, #f4e4c1)',
            color: '#050810',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            letterSpacing: '0.5px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
          }}
        >
          Get Started <ArrowRight size={20} />
        </button>
      </section>

      {/* Features Section */}
      <section style={{ padding: '100px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '60px',
          color: '#f4e4c1',
          letterSpacing: '-0.5px',
        }}>
          Powerful Features
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px',
        }}>
          {[
            { icon: Brain, title: 'AI-Powered', desc: 'Advanced machine learning models for intelligent conversations' },
            { icon: BarChart3, title: 'Real-time Analytics', desc: 'Track performance metrics and call insights instantly' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Sub-second response times for seamless interactions' },
            { icon: Shield, title: 'Enterprise Secure', desc: 'Bank-level encryption and compliance standards' },
            { icon: Headphones, title: 'Custom Voice', desc: 'Personalize voice tone and messaging for your brand' },
            { icon: Phone, title: 'Global Reach', desc: 'Connect with customers across 150+ countries' },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '32px',
                  background: hoveredCard === idx ? 'rgba(212, 175, 55, 0.15)' : 'rgba(15, 26, 42, 0.5)',
                  backdropFilter: 'blur(12px)',
                  border: hoveredCard === idx ? '1px solid rgba(212, 175, 55, 0.5)' : '1px solid rgba(212, 175, 55, 0.2)',
                  borderRadius: '12px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  boxShadow: hoveredCard === idx ? '0 0 30px rgba(212, 175, 55, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <Icon size={40} style={{ color: '#d4af37', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f4e4c1', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#f5ede0', lineHeight: '1.6', fontWeight: '300' }}>
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Statistics Section */}
      <section style={{
        padding: '100px 48px',
        background: 'rgba(212, 175, 55, 0.08)',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '60px',
          textAlign: 'center',
        }}>
          {[
            { number: '10M+', label: 'Calls Processed' },
            { number: '99.9%', label: 'Uptime SLA' },
            { number: '250+', label: 'Global Enterprises' },
            { number: '47%', label: 'Average Cost Reduction' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{
                fontSize: '48px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #d4af37, #f4e4c1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '12px',
              }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '16px', color: '#f5ede0', fontWeight: '500', letterSpacing: '0.3px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases Section */}
      <section style={{ padding: '100px 48px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: '60px',
          color: '#f4e4c1',
          letterSpacing: '-0.5px',
        }}>
          Perfect For Any Industry
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
        }}>
          {[
            { title: 'Customer Support', items: ['24/7 automated support', 'Multi-language support', 'Instant issue resolution'] },
            { title: 'Sales & Outreach', items: ['Lead qualification', 'Appointment scheduling', 'Follow-up automation'] },
            { title: 'Healthcare', items: ['Patient reminders', 'Appointment confirmations', 'Health monitoring calls'] },
            { title: 'Finance', items: ['Account notifications', 'Fraud alerts', 'Transaction confirmations'] },
          ].map((useCase, idx) => (
            <div
              key={idx}
              style={{
                padding: '28px',
                background: 'rgba(15, 26, 42, 0.5)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                borderRadius: '12px',
                transition: 'all 0.3s ease',
              }}
            >
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#f4e4c1', marginBottom: '16px' }}>
                {useCase.title}
              </h3>
              {useCase.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', color: '#f5ede0', fontSize: '14px' }}>
                  <Check size={16} style={{ color: '#d4af37', flexShrink: 0 }} />
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 48px',
        background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(197,113,113,0.1) 100%)',
        textAlign: 'center',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          marginBottom: '20px',
          background: 'linear-gradient(135deg, #d4af37, #f4e4c1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          letterSpacing: '-0.5px',
        }}>
          Ready to Elevate Your Communication?
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#f5ede0',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px',
          lineHeight: '1.6',
          fontWeight: '300',
        }}>
          Join thousands of enterprises transforming customer interactions with Voice AI
        </p>
        <button
          onClick={onSignInClick}
          style={{
            padding: '16px 48px',
            fontSize: '16px',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #d4af37, #f4e4c1)',
            color: '#050810',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
            letterSpacing: '0.5px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(212, 175, 55, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(212, 175, 55, 0.5)';
          }}
        >
          Start Free Trial
        </button>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 48px',
        background: 'rgba(15, 26, 42, 0.8)',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        textAlign: 'center',
        color: 'rgba(245, 237, 224, 0.6)',
        fontSize: '14px',
        letterSpacing: '0.3px',
      }}>
        <p style={{ marginBottom: '12px' }}>© 2025 Voice AI. All rights reserved.</p>
        <p>Transforming conversations with artificial intelligence</p>
      </footer>
    </div>
  );
}
