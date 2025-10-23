import { useState } from 'react';
import Dashboard from './Dashboard';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/SignInPage';

const VAPI_PRIVATE_KEY = import.meta.env.VITE_VAPI_PRIVATE_KEY || '';
const VAPI_PUBLIC_KEY = import.meta.env.VITE_VAPI_PUBLIC_KEY || '';

export default function App() {
  const [appState, setAppState] = useState('landing'); // 'landing', 'signin', 'dashboard'
  const [currentPage, setCurrentPage] = useState('overview');
  const [callHistory, setCallHistory] = useState([]);
  const [activeCall, setActiveCall] = useState(null);
  const [selectedAssistant, setSelectedAssistant] = useState(null);
  const [assistantDetails, setAssistantDetails] = useState(null);

  const addToCallHistory = (callRecord) => {
    setCallHistory([callRecord, ...callHistory]);
  };

  const handleAssistantChange = (assistant) => {
    setSelectedAssistant(assistant);
    setAssistantDetails(assistant);
    console.log('Selected assistant:', assistant);
  };

  const handleSignInClick = () => {
    setAppState('signin');
  };

  const handleSignIn = () => {
    setAppState('dashboard');
  };

  const handleBackToLanding = () => {
    setAppState('landing');
  };

  if (appState === 'landing') {
    return <LandingPage onSignInClick={handleSignInClick} />;
  }

  if (appState === 'signin') {
    return <SignInPage onBack={handleBackToLanding} onSignIn={handleSignIn} />;
  }

  return (
    <Dashboard
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      callHistory={callHistory}
      addToCallHistory={addToCallHistory}
      activeCall={activeCall}
      setActiveCall={setActiveCall}
      selectedAssistant={selectedAssistant}
      onAssistantChange={handleAssistantChange}
      assistantDetails={assistantDetails}
      vapiPublicKey={VAPI_PUBLIC_KEY}
      vapiPrivateKey={VAPI_PRIVATE_KEY}
      onLogout={handleBackToLanding}
    />
  );
}
