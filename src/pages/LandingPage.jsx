import React, { useState } from 'react';
import { ArrowRight, Check, MessageSquare, BarChart3, Lock, Zap, Users, TrendingUp } from 'lucide-react';

export default function LandingPage({ onSignInClick }) {
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div style={{ background: '#050505', color: '#ffffff', minHeight: '100vh' }}>
      {/* Navigation Header */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 48px',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-1px' }}>
          🎤 Voice AI
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button
            onClick={onSignInClick}
            style={{
              padding: '10px 24px',
              background: 'transparent',
              color: '#b0b0b0',
              border: '1px solid #1a1a1a',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.borderColor = '#2a2a2a';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#b0b0b0';
              e.target.style.borderColor = '#1a1a1a';
            }}
          >
            Sign In
          </button>
          <button
            onClick={onSignInClick}
            style={{
              padding: '10px 24px',
              background: '#1e40af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#3b82f6';
              e.target.style.boxShadow = '0 0 20px rgba(30, 64, 175, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1e40af';
              e.target.style.boxShadow = 'none';
            }}
          >
            Start Free Trial
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '120px 48px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 100%)',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
      }}>
        <h1 style={{
          fontSize: '64px',
          fontWeight: '800',
          marginBottom: '24px',
          lineHeight: '1.2',
          letterSpacing: '-1.5px',
        }}>
          The #1 AI Agent for<br />Customer Service
        </h1>
        <p style={{
          fontSize: '20px',
          color: '#b0b0b0',
          marginBottom: '48px',
          maxWidth: '700px',
          margin: '0 auto 48px',
          lineHeight: '1.6',
          fontWeight: '400',
        }}>
          Now on the phone. Instant conversations without IVR menus. 24/7 support. Natural speech. Customizable for your brand.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '80px' }}>
          <button
            onClick={onSignInClick}
            style={{
              padding: '14px 36px',
              background: '#1e40af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#3b82f6';
              e.target.style.boxShadow = '0 0 30px rgba(30, 64, 175, 0.4)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1e40af';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Contact Sales <ArrowRight size={18} />
          </button>
          <button
            onClick={onSignInClick}
            style={{
              padding: '14px 36px',
              background: 'rgba(30, 64, 175, 0.15)',
              color: '#ffffff',
              border: '1px solid rgba(30, 64, 175, 0.3)',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(30, 64, 175, 0.25)';
              e.target.style.borderColor = 'rgba(30, 64, 175, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(30, 64, 175, 0.15)';
              e.target.style.borderColor = 'rgba(30, 64, 175, 0.3)';
            }}
          >
            View Demo
          </button>
        </div>

        {/* Hero Badge */}
        <div style={{
          display: 'inline-block',
          padding: '12px 20px',
          background: 'rgba(30, 64, 175, 0.1)',
          border: '1px solid rgba(30, 64, 175, 0.2)',
          borderRadius: '6px',
          fontSize: '13px',
          color: '#60a5fa',
          fontWeight: '600',
          letterSpacing: '0.5px',
        }}>
          ⭐ #1 Agent on G2 • 65% Average Resolution Rate
        </div>
      </section>

      {/* Key Features Section */}
      <section style={{
        padding: '100px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '20px',
          letterSpacing: '-1px',
        }}>
          Experience the Difference
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#b0b0b0',
          textAlign: 'center',
          marginBottom: '80px',
          maxWidth: '600px',
          margin: '0 auto 80px',
        }}>
          Natural conversations that feel human, not robotic. Instant answers. Always available.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '80px',
        }}>
          {[
            { icon: MessageSquare, title: 'Natural Conversations', desc: 'No more waiting in automated queues. Get instant answers with a voice that feels human.' },
            { icon: BarChart3, title: '65% Resolution Rate', desc: 'Industry-leading resolution on first contact. Keeps customers happy and reduces follow-ups.' },
            { icon: Lock, title: 'Secure & Compliant', desc: 'Enterprise-grade encryption. Full HIPAA, CCPA, and SOC 2 compliance built-in.' },
            { icon: Zap, title: 'Lightning Fast', desc: 'Sub-second response times. No lag, no delays. Pure speed with high accuracy.' },
            { icon: Users, title: 'Brand Customizable', desc: 'Match your brand voice and tone. Customize everything to fit your business.' },
            { icon: TrendingUp, title: 'Real-time Analytics', desc: 'Track resolution rates, call duration, and customer satisfaction in real-time.' },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredFeature(idx)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  padding: '32px',
                  background: hoveredFeature === idx ? 'rgba(30, 64, 175, 0.15)' : 'rgba(10, 10, 10, 0.5)',
                  border: hoveredFeature === idx ? '1px solid rgba(30, 64, 175, 0.4)' : '1px solid rgba(30, 64, 175, 0.1)',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <Icon size={32} style={{ color: '#3b82f6', marginBottom: '16px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#b0b0b0', lineHeight: '1.6' }}>
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Capabilities Section */}
      <section style={{
        padding: '100px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '80px',
          letterSpacing: '-1px',
        }}>
          Test, Refine, and Launch with Confidence
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
        }}>
          {[
            { title: 'Preview in Sandbox', desc: 'Test your assistant in a safe environment before going live. No risk, full control.' },
            { title: 'Inspect Transcripts', desc: 'Review every conversation. Understand what works and optimize continuously.' },
            { title: 'Seamless Handoff', desc: 'When needed, smoothly transfer to human agents. No friction, no repeat information.' },
          ].map((capability, idx) => (
            <div
              key={idx}
              style={{
                padding: '36px',
                background: 'rgba(10, 10, 10, 0.5)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#3b82f6',
                marginBottom: '16px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                {String(idx + 1).padStart(2, '0')}
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                {capability.title}
              </h3>
              <p style={{ fontSize: '14px', color: '#b0b0b0', lineHeight: '1.6' }}>
                {capability.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '100px 48px',
        background: 'rgba(30, 64, 175, 0.08)',
        borderTop: '1px solid rgba(30, 64, 175, 0.1)',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
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
            { number: '65%', label: 'Average Resolution Rate' },
            { number: '99.9%', label: 'Uptime SLA' },
            { number: '150+', label: 'Countries Supported' },
            { number: '$0.99', label: 'Per Resolution' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div style={{
                fontSize: '48px',
                fontWeight: '800',
                color: '#3b82f6',
                marginBottom: '12px',
                letterSpacing: '-1px',
              }}>
                {stat.number}
              </div>
              <div style={{ fontSize: '15px', color: '#b0b0b0', fontWeight: '500' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{
        padding: '100px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          marginBottom: '24px',
          letterSpacing: '-1px',
        }}>
          Simple, Outcome-Based Pricing
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#b0b0b0',
          marginBottom: '60px',
          maxWidth: '600px',
          margin: '0 auto 60px',
        }}>
          Pay only for what works. No fixed fees. No surprises.
        </p>

        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '48px',
          background: 'rgba(10, 10, 10, 0.5)',
          border: '1px solid rgba(30, 64, 175, 0.2)',
          borderRadius: '8px',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '48px', fontWeight: '800', color: '#3b82f6', marginBottom: '8px' }}>
              $0.99
            </div>
            <div style={{ fontSize: '16px', color: '#b0b0b0' }}>
              Per successful resolution
            </div>
          </div>
          <ul style={{
            listStyle: 'none',
            marginBottom: '32px',
            textAlign: 'left',
          }}>
            {[
              'Minimum 50 resolutions/month',
              'No setup fees',
              'Cancel anytime',
              'Enterprise support included',
            ].map((item, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                fontSize: '14px',
                color: '#b0b0b0',
                borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
              }}>
                <Check size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>
          <button
            onClick={onSignInClick}
            style={{
              width: '100%',
              padding: '14px 24px',
              background: '#1e40af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#3b82f6';
              e.target.style.boxShadow = '0 0 30px rgba(30, 64, 175, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1e40af';
              e.target.style.boxShadow = 'none';
            }}
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 48px',
        background: 'rgba(30, 64, 175, 0.08)',
        textAlign: 'center',
        borderTop: '1px solid rgba(30, 64, 175, 0.1)',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          marginBottom: '24px',
          letterSpacing: '-1px',
        }}>
          Ready to Transform Customer Service?
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#b0b0b0',
          marginBottom: '40px',
          maxWidth: '600px',
          margin: '0 auto 40px',
        }}>
          Join leading enterprises using Voice AI to handle customer calls at scale.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <button
            onClick={onSignInClick}
            style={{
              padding: '14px 40px',
              background: '#1e40af',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#3b82f6';
              e.target.style.boxShadow = '0 0 30px rgba(30, 64, 175, 0.4)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1e40af';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Contact Sales
          </button>
          <button
            onClick={onSignInClick}
            style={{
              padding: '14px 40px',
              background: 'transparent',
              color: '#ffffff',
              border: '1px solid rgba(30, 64, 175, 0.3)',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'rgba(30, 64, 175, 0.6)';
              e.target.style.background = 'rgba(30, 64, 175, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(30, 64, 175, 0.3)';
              e.target.style.background = 'transparent';
            }}
          >
            View Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px',
        background: 'rgba(5, 5, 5, 0.8)',
        borderTop: '1px solid rgba(30, 64, 175, 0.1)',
        textAlign: 'center',
        color: '#b0b0b0',
        fontSize: '13px',
      }}>
        <div style={{ marginBottom: '20px' }}>
          <p>© 2025 Voice AI. All rights reserved. | Terms • Privacy • Security</p>
        </div>
        <div style={{ color: '#6b7280', fontSize: '12px' }}>
          Built with modern AI for enterprise customer service
        </div>
      </footer>
    </div>
  );
}
