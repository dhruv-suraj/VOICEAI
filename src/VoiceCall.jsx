import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { Phone, PhoneOff, Mic, MicOff, Upload, X, Copy, Download } from 'lucide-react';

export default function VoiceCall({ vapiPublicKey, vapiPrivateKey, assistantId }) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('idle'); // idle, connecting, active, ending
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callTranscript, setCallTranscript] = useState('');
  const [callHistory, setCallHistory] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [csvContacts, setCsvContacts] = useState([]);
  const [showTranscript, setShowTranscript] = useState(false);
  const vapiInstance = useRef(null);
  const callTimerRef = useRef(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    // Initialize Vapi
    if (vapiPublicKey) {
      vapiInstance.current = new Vapi(vapiPublicKey);

      // Set up event listeners
      vapiInstance.current.on('call-start', handleCallStart);
      vapiInstance.current.on('call-end', handleCallEnd);
      vapiInstance.current.on('message', handleMessage);
      vapiInstance.current.on('error', handleError);
    }

    return () => {
      // Cleanup
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
      if (vapiInstance.current) {
        vapiInstance.current.stop();
      }
    };
  }, [vapiPublicKey]);

  const handleCallStart = () => {
    setIsCallActive(true);
    setCallStatus('active');
    setCallDuration(0);
    transcriptRef.current = '';

    // Start timer
    callTimerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const handleCallEnd = () => {
    setIsCallActive(false);
    setCallStatus('idle');
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
    }

    // Save call to history
    if (transcriptRef.current || phoneNumber || selectedContact) {
      const callRecord = {
        id: Date.now(),
        phoneNumber: phoneNumber || selectedContact?.phoneNumber,
        name: selectedContact?.name || 'Unknown',
        duration: callDuration,
        transcript: transcriptRef.current,
        timestamp: new Date().toLocaleString(),
      };
      setCallHistory((prev) => [callRecord, ...prev]);
      setCallTranscript(transcriptRef.current);
      setShowTranscript(true);
    }
  };

  const handleMessage = (message) => {
    console.log('Vapi message:', message);

    // Capture transcript from message
    if (message && message.transcription) {
      transcriptRef.current += (transcriptRef.current ? '\n' : '') + message.transcription;
    }

    if (message && message.type === 'transcript') {
      transcriptRef.current += (transcriptRef.current ? '\n' : '') + message.text;
    }
  };

  const handleError = (error) => {
    console.error('Vapi error:', error);
    setCallStatus('idle');
    setIsCallActive(false);
  };

  const startCall = async () => {
    if (!assistantId) {
      console.error('Assistant ID is required');
      return;
    }

    const phoneToCall = selectedContact?.phoneNumber || phoneNumber;
    if (!phoneToCall) {
      console.error('Phone number is required');
      return;
    }

    setCallStatus('connecting');
    try {
      // Use Vapi Server API to make phone calls
      const apiKey = vapiPrivateKey || vapiPublicKey;

      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          assistantId: assistantId,
          customer: {
            number: phoneToCall,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData.message || `HTTP ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
      }

      const callData = await response.json();
      console.log('Call started successfully:', callData);

      // Simulate call start for UI purposes
      handleCallStart();
    } catch (error) {
      console.error('Failed to start call:', error.message);
      setCallStatus('idle');
      alert(`Error: ${error.message}`);
    }
  };

  const handleCSVUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result;
        if (!csv) return;

        const lines = csv.split('\n');
        const contacts = [];

        // Parse CSV - assumes format: name,phone or phone,name
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const parts = line.split(',').map((p) => p.trim());
          if (parts.length >= 2) {
            // Try to detect which is phone number (contains digits)
            const phoneIndex = parts.findIndex((p) => /\d{7,}/.test(p.replace(/[^\d]/g, '')));
            const nameIndex = phoneIndex === 0 ? 1 : 0;

            if (phoneIndex !== -1) {
              contacts.push({
                id: contacts.length,
                name: parts[nameIndex] || 'Unknown',
                phoneNumber: parts[phoneIndex],
              });
            }
          }
        }

        if (contacts.length > 0) {
          setCsvContacts(contacts);
          console.log(`Loaded ${contacts.length} contacts from CSV`);
        }
      } catch (error) {
        console.error('Error parsing CSV:', error);
      }
    };

    reader.readAsText(file);
    event.target.value = '';
  };

  const selectContact = (contact) => {
    setSelectedContact(contact);
    setPhoneNumber(contact.phoneNumber);
  };

  const copyTranscript = () => {
    navigator.clipboard.writeText(callTranscript);
  };

  const downloadTranscript = () => {
    const element = document.createElement('a');
    const file = new Blob([callTranscript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `transcript_${new Date().getTime()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const endCall = async () => {
    setCallStatus('ending');
    try {
      await vapiInstance.current.stop();
    } catch (error) {
      console.error('Failed to end call:', error);
    }
  };

  const toggleMic = () => {
    setIsMicEnabled(!isMicEnabled);
    if (vapiInstance.current) {
      if (isMicEnabled) {
        vapiInstance.current.setMuted(true);
      } else {
        vapiInstance.current.setMuted(false);
      }
    }
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
    }}>
      {/* Phone Number Input & CSV Upload Section */}
      {!isCallActive && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          {/* Phone Number Input */}
          <div>
            <label style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '8px' }}>
              Enter Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 000-0000"
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '14px',
                boxSizing: 'border-box',
              }}
            />
          </div>

          {/* CSV Upload */}
          <div>
            <label style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '8px' }}>
              Import Contacts (CSV)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                style={{
                  display: 'none',
                }}
                id="csv-upload"
              />
              <label
                htmlFor="csv-upload"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Upload size={16} />
                Upload CSV
              </label>
            </div>
          </div>
        </div>
      )}

      {/* CSV Contacts List */}
      {csvContacts.length > 0 && !isCallActive && (
        <div style={{
          padding: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '12px', fontWeight: '600' }}>
            Loaded Contacts ({csvContacts.length})
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            maxHeight: '150px',
            overflowY: 'auto',
          }}>
            {csvContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => selectContact(contact)}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  border: selectedContact?.id === contact.id ? '2px solid #10b981' : '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: selectedContact?.id === contact.id ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {contact.name} ({contact.phoneNumber})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Call Controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        {/* Status and Duration Display */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '32px',
            fontWeight: '700',
            marginBottom: '8px',
            color: isCallActive ? '#10b981' : '#fff',
          }}>
            {isCallActive ? formatDuration(callDuration) : 'Ready to Call'}
          </div>
          <div style={{
            fontSize: '14px',
            color: 'rgba(255, 255, 255, 0.7)',
          }}>
            {selectedContact ? `Calling: ${selectedContact.name}` : phoneNumber ? `Calling: ${phoneNumber}` : callStatus === 'active' ? 'Call in progress...' : callStatus === 'connecting' ? 'Connecting...' : 'Enter a phone number to start'}
          </div>
        </div>

        {/* Call Control Buttons */}
        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}>
          {/* Microphone Toggle */}
          {isCallActive && (
            <button
              onClick={toggleMic}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                border: 'none',
                backgroundColor: isMicEnabled ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                color: isMicEnabled ? '#3b82f6' : '#ef4444',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              title={isMicEnabled ? 'Mute' : 'Unmute'}
            >
              {isMicEnabled ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
          )}

          {/* Start/End Call Button */}
          <button
            onClick={isCallActive ? endCall : startCall}
            disabled={callStatus === 'connecting' || callStatus === 'ending' || (!phoneNumber && !selectedContact)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              border: 'none',
              backgroundColor: isCallActive ? '#ef4444' : '#10b981',
              color: '#fff',
              cursor: (callStatus === 'connecting' || callStatus === 'ending' || (!phoneNumber && !selectedContact)) ? 'not-allowed' : 'pointer',
              fontSize: '24px',
              transition: 'all 0.2s',
              opacity: (callStatus === 'connecting' || callStatus === 'ending' || (!phoneNumber && !selectedContact)) ? 0.6 : 1,
            }}
            title={isCallActive ? 'End Call' : 'Start Call'}
          >
            {isCallActive ? <PhoneOff size={28} /> : <Phone size={28} />}
          </button>
        </div>
      </div>

      {/* Transcript Section */}
      {showTranscript && callTranscript && (
        <div style={{
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
          }}>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#fff' }}>Call Transcript</h4>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={copyTranscript}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  color: '#3b82f6',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                title="Copy to clipboard"
              >
                <Copy size={14} />
                Copy
              </button>
              <button
                onClick={downloadTranscript}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'rgba(34, 197, 94, 0.2)',
                  color: '#22c55e',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                title="Download as text file"
              >
                <Download size={14} />
                Download
              </button>
            </div>
          </div>
          <div style={{
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            padding: '12px',
            borderRadius: '8px',
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '13px',
            lineHeight: '1.6',
            maxHeight: '300px',
            overflowY: 'auto',
            fontFamily: 'monospace',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}>
            {callTranscript || 'No transcript available'}
          </div>
        </div>
      )}

      {/* Call History */}
      {callHistory.length > 0 && (
        <div style={{
          padding: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: '#fff' }}>Call History</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {callHistory.map((call) => (
              <div
                key={call.id}
                style={{
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.9)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontWeight: '600' }}>{call.name}</span>
                  <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>{call.timestamp}</span>
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {call.phoneNumber} • Duration: {formatDuration(call.duration)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info Text */}
      {!vapiPublicKey && (
        <div style={{
          fontSize: '12px',
          color: '#fca5a5',
          textAlign: 'center',
        }}>
          ⚠️ Vapi API key not configured
        </div>
      )}

      {!assistantId && vapiPublicKey && (
        <div style={{
          fontSize: '12px',
          color: '#fca5a5',
          textAlign: 'center',
        }}>
          ⚠️ Assistant ID not configured
        </div>
      )}
    </div>
  );
}
