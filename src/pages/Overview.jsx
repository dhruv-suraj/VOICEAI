import { Phone, PhoneOff, Mic, MicOff, Upload, Copy, Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';

export default function Overview({ vapiPublicKey, vapiPrivateKey, assistantId, addToCallHistory }) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('idle');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callTranscript, setCallTranscript] = useState('');
  const [csvContacts, setCsvContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);

  const vapiInstance = useRef(null);
  const callTimerRef = useRef(null);
  const transcriptRef = useRef('');

  useEffect(() => {
    if (vapiPublicKey) {
      vapiInstance.current = new Vapi(vapiPublicKey);
      vapiInstance.current.on('call-start', handleCallStart);
      vapiInstance.current.on('call-end', handleCallEnd);
      vapiInstance.current.on('message', handleMessage);
      vapiInstance.current.on('error', handleError);
    }

    return () => {
      if (callTimerRef.current) clearInterval(callTimerRef.current);
      if (vapiInstance.current) vapiInstance.current.stop();
    };
  }, [vapiPublicKey]);

  const handleCallStart = () => {
    setIsCallActive(true);
    setCallStatus('active');
    setCallDuration(0);
    transcriptRef.current = '';

    callTimerRef.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  };

  const handleCallEnd = () => {
    setIsCallActive(false);
    setCallStatus('idle');
    if (callTimerRef.current) clearInterval(callTimerRef.current);

    if (transcriptRef.current || phoneNumber || selectedContact) {
      const callRecord = {
        id: Date.now(),
        phoneNumber: phoneNumber || selectedContact?.phoneNumber,
        name: selectedContact?.name || 'Unknown',
        duration: callDuration,
        transcript: transcriptRef.current,
        timestamp: new Date().toLocaleString(),
      };
      addToCallHistory(callRecord);
      setCallTranscript(transcriptRef.current);
      setShowTranscript(true);
    }
  };

  const handleMessage = (message) => {
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

  const formatPhoneNumber = (phone) => {
    if (!phone) return '';

    // Remove all non-digit characters except +
    let cleaned = phone.replace(/[^\d+]/g, '');

    // If it doesn't start with +, add +1 (US default)
    if (!cleaned.startsWith('+')) {
      // If it's 10 digits, assume it's US
      if (cleaned.length === 10) {
        cleaned = '+1' + cleaned;
      }
      // If it's 11 digits and starts with 1, add +
      else if (cleaned.length === 11 && cleaned.startsWith('1')) {
        cleaned = '+' + cleaned;
      }
      // Otherwise, assume +1 prefix
      else if (cleaned.length < 15) {
        cleaned = '+1' + cleaned;
      }
    }

    return cleaned;
  };

  const startCall = async () => {
    if (!assistantId) {
      alert('Assistant ID is required');
      return;
    }

    let phoneToCall = selectedContact?.phoneNumber || phoneNumber;
    if (!phoneToCall) {
      alert('Phone number is required');
      return;
    }

    // Format phone number to E.164
    phoneToCall = formatPhoneNumber(phoneToCall);

    // Validate E.164 format
    if (!/^\+\d{1,15}$/.test(phoneToCall)) {
      alert(`Invalid phone number format. Please use E.164 format like +1-202-555-0173 or just the number (we'll add +1)`);
      return;
    }

    setCallStatus('connecting');
    try {
      const apiKey = vapiPrivateKey || vapiPublicKey;

      if (!apiKey) {
        throw new Error('API key not configured');
      }

      console.log('Starting call with:');
      console.log('Assistant ID:', assistantId);
      console.log('Phone Number:', phoneToCall);
      console.log('API Key:', apiKey.substring(0, 10) + '...');

      const callPayload = {
        assistantId,
        customer: {
          number: phoneToCall,
        },
      };

      console.log('Call payload:', JSON.stringify(callPayload, null, 2));

      const response = await fetch('https://api.vapi.ai/call', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(callPayload),
      });

      console.log('Response status:', response.status);
      const responseData = await response.json();
      console.log('Response data:', responseData);

      if (!response.ok) {
        throw new Error(responseData.message || responseData.error || `HTTP ${response.status}: ${response.statusText}`);
      }

      console.log('Call started successfully:', responseData);
      handleCallStart();
      alert('Call initiated! Connecting...');
    } catch (error) {
      console.error('Failed to start call:', error);
      setCallStatus('idle');
      alert(`Error: ${error.message}`);
    }
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
      vapiInstance.current.setMuted(!isMicEnabled);
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

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          const parts = line.split(',').map((p) => p.trim());
          if (parts.length >= 2) {
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
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

          <div>
            <label style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '8px' }}>
              Import Contacts (CSV)
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSVUpload}
                style={{ display: 'none' }}
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
                }}
              >
                <Upload size={16} />
                Upload CSV
              </label>
            </div>
          </div>
        </div>
      )}

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
                  whiteSpace: 'nowrap',
                }}
              >
                {contact.name} ({contact.phoneNumber})
              </button>
            ))}
          </div>
        </div>
      )}

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

        <div style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
        }}>
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
              }}
              title={isMicEnabled ? 'Mute' : 'Unmute'}
            >
              {isMicEnabled ? <Mic size={24} /> : <MicOff size={24} />}
            </button>
          )}

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
              opacity: (callStatus === 'connecting' || callStatus === 'ending' || (!phoneNumber && !selectedContact)) ? 0.6 : 1,
            }}
            title={isCallActive ? 'End Call' : 'Start Call'}
          >
            {isCallActive ? <PhoneOff size={28} /> : <Phone size={28} />}
          </button>
        </div>
      </div>

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
    </div>
  );
}
