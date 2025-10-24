import React, { useState, useEffect } from 'react';
import { ArrowRight, Check, MessageSquare, BarChart3, Lock, Zap, Users, TrendingUp, Play } from 'lucide-react';

export default function LandingPage({ onSignInClick }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollY, setScrollY] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const buttonBase = {
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    fontSize: '15px',
    fontWeight: '600',
    border: 'none',
    borderRadius: '6px',
  };

  const primaryButton = {
    ...buttonBase,
    background: '#1e40af',
    color: '#ffffff',
    padding: '12px 32px',
  };

  const secondaryButton = {
    ...buttonBase,
    background: 'rgba(30, 64, 175, 0.15)',
    color: '#ffffff',
    border: '1px solid rgba(30, 64, 175, 0.3)',
    padding: '12px 32px',
  };

  return (
    <div style={{ background: '#050505', color: '#ffffff', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Navigation Header */}
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 48px',
        background: 'rgba(5, 5, 5, 0.8)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(30, 64, 175, 0.15)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ fontSize: '20px', fontWeight: '700', letterSpacing: '-0.5px' }}>
          🎤 Voice AI
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={onSignInClick}
            style={{
              ...buttonBase,
              background: 'transparent',
              color: '#b0b0b0',
              border: '1px solid #1a1a1a',
              padding: '10px 20px',
              fontSize: '14px',
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#ffffff';
              e.target.style.borderColor = '#2a2a2a';
              e.target.style.background = 'rgba(30, 30, 30, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#b0b0b0';
              e.target.style.borderColor = '#1a1a1a';
              e.target.style.background = 'transparent';
            }}
          >
            Sign In
          </button>
          <button
            onClick={onSignInClick}
            style={primaryButton}
            onMouseEnter={(e) => {
              e.target.style.background = '#3b82f6';
              e.target.style.boxShadow = '0 0 20px rgba(30, 64, 175, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#1e40af';
              e.target.style.boxShadow = 'none';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Start Free Trial
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        padding: '140px 48px',
        textAlign: 'center',
        background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 100%)',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background Solar Flare Effect */}
        <div style={{
          position: 'absolute',
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(30, 64, 175, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(80px)',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: '800',
            marginBottom: '24px',
            lineHeight: '1.1',
            letterSpacing: '-2px',
            maxWidth: '900px',
            margin: '0 auto 24px',
          }}>
            The #1 AI Agent for all customer service—now on the phone
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#b0b0b0',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px',
            lineHeight: '1.6',
            fontWeight: '400',
          }}>
            Instant conversations. No wait times. No phone menus. 24/7 support. Natural speech. Customizable to your brand.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '64px', flexWrap: 'wrap' }}>
            <button
              onClick={onSignInClick}
              style={primaryButton}
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
              onClick={() => setIsVideoPlaying(true)}
              style={secondaryButton}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(30, 64, 175, 0.25)';
                e.target.style.borderColor = 'rgba(30, 64, 175, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(30, 64, 175, 0.15)';
                e.target.style.borderColor = 'rgba(30, 64, 175, 0.3)';
              }}
            >
              <Play size={16} style={{ marginRight: '8px', display: 'inline' }} />
              View Demo
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
            <div style={{
              fontSize: '12px',
              color: '#b0b0b0',
              padding: '8px 16px',
              background: 'rgba(30, 64, 175, 0.1)',
              border: '1px solid rgba(30, 64, 175, 0.2)',
              borderRadius: '6px',
              fontWeight: '500',
              letterSpacing: '0.5px',
            }}>
              ⭐ #1 Agent on G2
            </div>
            <div style={{
              fontSize: '12px',
              color: '#b0b0b0',
              padding: '8px 16px',
              background: 'rgba(30, 64, 175, 0.1)',
              border: '1px solid rgba(30, 64, 175, 0.2)',
              borderRadius: '6px',
              fontWeight: '500',
              letterSpacing: '0.5px',
            }}>
              65% Average Resolution Rate
            </div>
            <div style={{
              fontSize: '12px',
              color: '#b0b0b0',
              padding: '8px 16px',
              background: 'rgba(30, 64, 175, 0.1)',
              border: '1px solid rgba(30, 64, 175, 0.2)',
              borderRadius: '6px',
              fontWeight: '500',
              letterSpacing: '0.5px',
            }}>
              99.9% Uptime SLA
            </div>
          </div>
        </div>
      </section>

      {/* Experience the Difference Section */}
      <section style={{
        padding: '120px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '20px',
          letterSpacing: '-1.5px',
        }}>
          Experience the Difference
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#b0b0b0',
          textAlign: 'center',
          marginBottom: '80px',
          maxWidth: '600px',
          margin: '0 auto 80px',
        }}>
          Natural conversations that sound human. Instant answers. Always available.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
        }}>
          {[
            {
              icon: MessageSquare,
              title: 'Natural Conversations',
              desc: 'No more waiting in automated queues. Get instant answers with a voice that feels human, not robotic.',
            },
            {
              icon: BarChart3,
              title: '65% Resolution Rate',
              desc: 'Industry-leading resolution on first contact. Keeps customers happy and reduces follow-ups.',
            },
            {
              icon: Lock,
              title: 'Secure & Compliant',
              desc: 'Enterprise-grade encryption. Full HIPAA, CCPA, and SOC 2 compliance built-in.',
            },
            {
              icon: Zap,
              title: 'Lightning Fast',
              desc: 'Sub-second response times. No lag, no delays. Pure speed with high accuracy.',
            },
            {
              icon: Users,
              title: 'Brand Customizable',
              desc: 'Match your brand voice and tone. Customize everything to fit your business.',
            },
            {
              icon: TrendingUp,
              title: 'Real-time Analytics',
              desc: 'Track resolution rates, call duration, and customer satisfaction in real-time.',
            },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  padding: '32px',
                  background: hoveredCard === idx ? 'rgba(30, 64, 175, 0.15)' : 'rgba(10, 10, 10, 0.5)',
                  border: hoveredCard === idx ? '1px solid rgba(30, 64, 175, 0.4)' : '1px solid rgba(30, 64, 175, 0.1)',
                  borderRadius: '8px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  transform: hoveredCard === idx ? 'translateY(-4px)' : 'translateY(0)',
                  boxShadow: hoveredCard === idx ? '0 8px 24px rgba(30, 64, 175, 0.15)' : 'none',
                }}
              >
                <Icon size={36} style={{ color: '#3b82f6', marginBottom: '16px' }} />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  letterSpacing: '-0.5px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#b0b0b0',
                  lineHeight: '1.6',
                  margin: 0,
                }}>
                  {feature.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Test, Refine, Launch Section */}
      <section style={{
        padding: '120px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '80px',
          letterSpacing: '-1.5px',
        }}>
          Test, Refine, and Launch with Confidence
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
        }}>
          {[
            {
              num: '01',
              title: 'Preview in Sandbox',
              desc: 'Test your assistant in a safe environment before going live. No risk, full control.',
            },
            {
              num: '02',
              title: 'Inspect Transcripts',
              desc: 'Review every conversation. Understand what works and optimize continuously.',
            },
            {
              num: '03',
              title: 'Seamless Handoff',
              desc: 'When needed, smoothly transfer to human agents. No friction, no repeat information.',
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                padding: '40px',
                background: 'rgba(10, 10, 10, 0.5)',
                border: '1px solid rgba(30, 64, 175, 0.1)',
                borderRadius: '8px',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontSize: '32px',
                fontWeight: '800',
                color: '#3b82f6',
                marginBottom: '20px',
                letterSpacing: '-0.5px',
              }}>
                {item.num}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                marginBottom: '12px',
                letterSpacing: '-0.5px',
              }}>
                {item.title}
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#b0b0b0',
                lineHeight: '1.6',
                margin: 0,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '100px 48px',
        background: 'rgba(30, 64, 175, 0.08)',
        borderTop: '1px solid rgba(30, 64, 175, 0.15)',
        borderBottom: '1px solid rgba(30, 64, 175, 0.15)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
                fontSize: '56px',
                fontWeight: '800',
                color: '#3b82f6',
                marginBottom: '12px',
                letterSpacing: '-2px',
              }}>
                {stat.number}
              </div>
              <div style={{
                fontSize: '14px',
                color: '#b0b0b0',
                fontWeight: '500',
                letterSpacing: '0.3px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section style={{
        padding: '120px 48px',
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          marginBottom: '24px',
          letterSpacing: '-1.5px',
        }}>
          Simple, Outcome-Based Pricing
        </h2>
        <p style={{
          fontSize: '16px',
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
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              fontSize: '56px',
              fontWeight: '800',
              color: '#3b82f6',
              marginBottom: '12px',
              letterSpacing: '-1px',
            }}>
              $0.99
            </div>
            <div style={{
              fontSize: '16px',
              color: '#b0b0b0',
              fontWeight: '400',
            }}>
              Per successful resolution
            </div>
          </div>

          <ul style={{
            listStyle: 'none',
            marginBottom: '40px',
            textAlign: 'left',
            padding: 0,
          }}>
            {[
              'Minimum 50 resolutions/month',
              'No setup fees',
              'Cancel anytime',
              'Enterprise support included',
            ].map((item, idx) => (
              <li
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 0',
                  fontSize: '14px',
                  color: '#b0b0b0',
                  borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
                }}
              >
                <Check size={18} style={{ color: '#3b82f6', flexShrink: 0 }} />
                {item}
              </li>
            ))}
          </ul>

          <button
            onClick={onSignInClick}
            style={{
              ...primaryButton,
              width: '100%',
              padding: '14px 24px',
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

      {/* Final CTA Section */}
      <section style={{
        padding: '120px 48px',
        background: 'rgba(30, 64, 175, 0.08)',
        textAlign: 'center',
        borderTop: '1px solid rgba(30, 64, 175, 0.15)',
        borderBottom: '1px solid rgba(30, 64, 175, 0.15)',
      }}>
        <h2 style={{
          fontSize: '48px',
          fontWeight: '800',
          marginBottom: '24px',
          letterSpacing: '-1.5px',
          maxWidth: '800px',
          margin: '0 auto 24px',
        }}>
          Ready to Transform Customer Service?
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#b0b0b0',
          marginBottom: '48px',
          maxWidth: '600px',
          margin: '0 auto 48px',
        }}>
          Join leading enterprises using AI to handle customer calls at scale.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={onSignInClick}
            style={primaryButton}
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
            onClick={() => setIsVideoPlaying(true)}
            style={secondaryButton}
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
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px',
        background: 'rgba(5, 5, 5, 0.8)',
        borderTop: '1px solid rgba(30, 64, 175, 0.15)',
        textAlign: 'center',
        color: '#b0b0b0',
        fontSize: '12px',
      }}>
        <p style={{ marginBottom: '8px' }}>
          © 2025 Voice AI. All rights reserved. | Terms • Privacy • Security
        </p>
        <p style={{ margin: 0, color: '#6b7280', fontSize: '11px' }}>
          Built with modern AI for enterprise customer service
        </p>
      </footer>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setIsVideoPlaying(false)}
        >
          <div
            style={{
              width: '90%',
              maxWidth: '800px',
              aspectRatio: '16 / 9',
              background: '#000',
              borderRadius: '8px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsVideoPlaying(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#fff',
                border: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
              }}
            >
              ✕
            </button>
            <video
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
              }}
              controls
              autoPlay
            >
              <source src="https://via.placeholder.com/800x450" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
