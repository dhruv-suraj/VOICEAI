import { BarChart3, Grid, FileText, MessageCircle, LogOut } from 'lucide-react';
import Overview from './pages/Overview';
import Metrics from './pages/Metrics';
import StructuredOutputs from './pages/StructuredOutputs';
import TestSuites from './pages/TestSuites';
import CallLogs from './pages/CallLogs';
import AssistantSelector from './components/AssistantSelector';

const VAPI_PHONE_NUMBER_ID = import.meta.env.VITE_VAPI_PHONE_NUMBER_ID || '';

export default function Dashboard({
  currentPage,
  setCurrentPage,
  callHistory,
  addToCallHistory,
  selectedAssistant,
  onAssistantChange,
  assistantDetails,
  vapiPublicKey,
  vapiPrivateKey,
  onLogout,
}) {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'metrics', label: 'Metrics', icon: BarChart3 },
    { id: 'structured-outputs', label: 'Structured Outputs', icon: Grid },
    { id: 'test-suites', label: 'Test Suites', icon: FileText },
    { id: 'call-logs', label: 'Call Logs', icon: MessageCircle },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return (
          <Overview
            vapiPublicKey={vapiPublicKey}
            vapiPrivateKey={vapiPrivateKey}
            vapiPhoneNumberId={VAPI_PHONE_NUMBER_ID}
            selectedAssistant={selectedAssistant}
            assistantDetails={assistantDetails}
            addToCallHistory={addToCallHistory}
          />
        );
      case 'metrics':
        return <Metrics callHistory={callHistory} />;
      case 'structured-outputs':
        return <StructuredOutputs callHistory={callHistory} />;
      case 'test-suites':
        return <TestSuites callHistory={callHistory} />;
      case 'call-logs':
        return <CallLogs callHistory={callHistory} vapiPrivateKey={vapiPrivateKey} />;
      default:
        return (
          <Overview
            vapiPublicKey={vapiPublicKey}
            vapiPrivateKey={vapiPrivateKey}
            vapiPhoneNumberId={VAPI_PHONE_NUMBER_ID}
            selectedAssistant={selectedAssistant}
            assistantDetails={assistantDetails}
            addToCallHistory={addToCallHistory}
          />
        );
    }
  };

  const getPageTitle = () => {
    const item = navItems.find((item) => item.id === currentPage);
    return item ? item.label : 'Overview';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', color: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto' }}>
      {/* Sidebar - VOICE AI Style */}
      <div style={{
        width: '250px',
        background: 'rgba(10, 10, 10, 0.5)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(30, 64, 175, 0.15)',
        overflowY: 'auto',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Logo */}
        <div style={{
          padding: '24px 20px',
          borderBottom: '1px solid rgba(30, 64, 175, 0.15)',
          flexShrink: 0,
          background: 'rgba(30, 64, 175, 0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'rgba(30, 64, 175, 0.2)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}>🎤</div>
            <h1 style={{ fontSize: '18px', fontWeight: '700', margin: 0, color: '#ffffff', letterSpacing: '-0.5px' }}>
              Voice AI
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '6px',
                  border: isActive ? '1px solid rgba(30, 64, 175, 0.3)' : '1px solid transparent',
                  background: isActive ? 'rgba(30, 64, 175, 0.15)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: isActive ? '#60a5fa' : '#b0b0b0',
                  fontWeight: isActive ? '600' : '500',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '0 0 12px rgba(30, 64, 175, 0.15)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(30, 64, 175, 0.1)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#b0b0b0';
                  }
                }}
              >
                <Icon size={16} style={{ color: isActive ? '#3b82f6' : 'currentColor' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div style={{
          padding: '14px 12px',
          borderTop: '1px solid rgba(30, 64, 175, 0.15)',
          fontSize: '11px',
          color: '#6b7280',
          textAlign: 'center',
          letterSpacing: '0.3px'
        }}>
          v1.0 • Powered by VAPI
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header - VOICE AI Style */}
        <div style={{
          padding: '20px 32px',
          borderBottom: '1px solid rgba(30, 64, 175, 0.1)',
          background: 'rgba(5, 5, 5, 0.8)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            <h2 style={{
              margin: 0,
              fontSize: '24px',
              fontWeight: '700',
              letterSpacing: '-0.5px',
              color: '#ffffff'
            }}>
              {getPageTitle()}
            </h2>
            {currentPage === 'overview' && (
              <div style={{ flex: 1, maxWidth: '350px' }}>
                <AssistantSelector
                  vapiPrivateKey={vapiPrivateKey}
                  selectedAssistantId={selectedAssistant?.id}
                  onAssistantChange={onAssistantChange}
                  assistantDetails={assistantDetails}
                />
              </div>
            )}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              fontSize: '12px',
              color: '#b0b0b0',
              padding: '8px 14px',
              background: 'rgba(30, 64, 175, 0.1)',
              borderRadius: '6px',
              border: '1px solid rgba(30, 64, 175, 0.2)',
              letterSpacing: '0.3px',
              fontWeight: '500'
            }}>
              {callHistory.length > 0 ? `${callHistory.length} calls` : 'No calls yet'}
            </div>
            <button
              onClick={onLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: 'rgba(220, 38, 38, 0.1)',
                border: '1px solid rgba(220, 38, 38, 0.2)',
                borderRadius: '6px',
                color: '#fca5a5',
                fontSize: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.2)';
              }}
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px',
          background: '#050505',
          position: 'relative'
        }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
