import { useState } from 'react';
import Dashboard from './Dashboard';

export default function App() {
  const [currentPage, setCurrentPage] = useState('overview');
  const [callHistory, setCallHistory] = useState([]);
  const [activeCall, setActiveCall] = useState(null);

  const addToCallHistory = (callRecord) => {
    setCallHistory([callRecord, ...callHistory]);
  };

  return (
    <Dashboard
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      callHistory={callHistory}
      addToCallHistory={addToCallHistory}
      activeCall={activeCall}
      setActiveCall={setActiveCall}
    />
  );
}
