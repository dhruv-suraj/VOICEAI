import { BarChart3, Grid, FileText, MessageCircle } from 'lucide-react';
import Overview from './pages/Overview';
import Metrics from './pages/Metrics';
import StructuredOutputs from './pages/StructuredOutputs';
import TestSuites from './pages/TestSuites';
import CallLogs from './pages/CallLogs';

const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || '';
const VAPI_PRIVATE_KEY = import.meta.env.VITE_VAPI_PRIVATE_KEY || '';
const VAPI_ASSISTANT_ID = import.meta.env.VITE_VAPI_ASSISTANT_ID || '';

export default function Dashboard({ currentPage, setCurrentPage, callHistory, addToCallHistory }) {
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
            vapiPublicKey={VAPI_PUBLIC_KEY}
            vapiPrivateKey={VAPI_PRIVATE_KEY}
            assistantId={VAPI_ASSISTANT_ID}
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
        return <CallLogs callHistory={callHistory} />;
      default:
        return <Overview vapiPublicKey={VAPI_PUBLIC_KEY} vapiPrivateKey={VAPI_PRIVATE_KEY} assistantId={VAPI_ASSISTANT_ID} addToCallHistory={addToCallHistory} />;
    }
  };

  const getPageTitle = () => {
    const item = navItems.find((item) => item.id === currentPage);
    return item ? item.label : 'Overview';
  };

  return (
    <div style={{ display: 'flex', height: '100vh', backgroundImage: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', fontFamily: 'system-ui, -apple-system' }}>
      {/* Sidebar */}
      <div style={{ width: '200px', backgroundColor: '#2d3748', display: 'flex', flexDirection: 'column', borderRight: '1px solid #1a202c', overflowY: 'auto' }}>
        {/* Logo */}
        <div style={{ padding: '20px', borderBottom: '1px solid #1a3a52', flexShrink: 0 }}>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', letterSpacing: '-0.02em', margin: 0, color: '#fff' }}>Voice AI</h1>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
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
                  gap: '10px',
                  padding: '8px 12px',
                  borderRadius: '5px',
                  border: 'none',
                  backgroundColor: isActive ? '#4a5568' : 'transparent',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: isActive ? '#fff' : '#cbd5e0',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Icon size={16} style={{ color: isActive ? '#667eea' : 'inherit' }} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '20px 32px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ margin: 0, fontSize: '24px', fontWeight: '600', color: '#fff' }}>{getPageTitle()}</h2>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
            {callHistory.length > 0 && `${callHistory.length} calls`}
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '32px' }}>
          {renderPage()}
        </div>
      </div>
    </div>
  );
}
