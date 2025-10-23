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
    <div style={{ display: 'flex', height: '100vh', color: '#fff', fontFamily: 'system-ui, -apple-system' }}>
      {/* Sidebar - Luxury Style */}
      <div style={{
        width: '250px',
        background: 'rgba(15, 26, 42, 0.6)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid rgba(212, 175, 55, 0.15)',
        overflowY: 'auto',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
      }}>
        {/* Logo */}
        <div style={{
          padding: '28px 20px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
          flexShrink: 0,
          background: 'rgba(212, 175, 55, 0.08)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #d4af37 0%, #f4e4c1 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
            }}>🎤</div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '0.5px', margin: 0, background: 'linear-gradient(135deg, #d4af37, #f4e4c1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Voice AI
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '16px 8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: isActive ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid transparent',
                  background: isActive ? 'rgba(212, 175, 55, 0.12)' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: isActive ? '#f4e4c1' : 'rgba(245, 237, 224, 0.7)',
                  fontWeight: isActive ? '600' : '500',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? '0 0 12px rgba(212, 175, 55, 0.2)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.08)';
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                <Icon size={18} style={{ color: isActive ? '#d4af37' : 'rgba(245, 237, 224, 0.6)' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div style={{
          padding: '16px 16px',
          borderTop: '1px solid rgba(212, 175, 55, 0.15)',
          fontSize: '12px',
          color: 'rgba(212, 175, 55, 0.6)',
          textAlign: 'center',
          letterSpacing: '0.3px'
        }}>
          v1.0 • Powered by VAPI
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header - Luxury Style */}
        <div style={{
          padding: '24px 32px',
          borderBottom: '1px solid rgba(212, 175, 55, 0.15)',
          background: 'rgba(15, 26, 42, 0.5)',
          backdropFilter: 'blur(12px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
            <h2 style={{
              margin: 0,
              fontSize: '28px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              background: 'linear-gradient(135deg, #d4af37, #f4e4c1)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              fontSize: '13px',
              color: '#f4e4c1',
              padding: '8px 16px',
              background: 'rgba(212, 175, 55, 0.15)',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
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
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(197, 113, 113, 0.15)',
                border: '1px solid rgba(197, 113, 113, 0.3)',
                borderRadius: '8px',
                color: '#d4a5a5',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.3px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(197, 113, 113, 0.25)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(197, 113, 113, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(197, 113, 113, 0.15)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '32px',
          backgroundImage: 'linear-gradient(180deg, rgba(212,175,55,0.04) 0%, transparent 50%)',
          position: 'relative'
        }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
