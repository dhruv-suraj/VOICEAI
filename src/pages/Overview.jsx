import { Phone, PhoneOff, Mic, MicOff, Upload, Copy, Download } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Vapi from '@vapi-ai/web';
import { vapiService } from '../services/vapiService';

export default function Overview({
  vapiPublicKey,
  vapiPrivateKey,
  vapiPhoneNumberId,
  selectedAssistant,
  addToCallHistory,
}) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicEnabled, setIsMicEnabled] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [callStatus, setCallStatus] = useState('idle');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [callTranscript, setCallTranscript] = useState('');
  const [csvContacts, setCsvContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [availableAssistants, setAvailableAssistants] = useState([]);
  const [selectedContactIds, setSelectedContactIds] = useState([]);
  const [editingContactId, setEditingContactId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showBatchCallStatus, setShowBatchCallStatus] = useState(false);
  const [batchCallStatus, setBatchCallStatus] = useState([]);
  const expectedRingTime = 30; // Default 30 seconds

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

  // Fetch available assistants for the dropdown
  useEffect(() => {
    const fetchAssistants = async () => {
      if (vapiPrivateKey) {
        const assistants = await vapiService.fetchAssistants(vapiPrivateKey);
        setAvailableAssistants(assistants);

        // If CSV contacts were loaded with null assistants, reassign them now
        if (assistants.length > 0 && csvContacts.length > 0) {
          setCsvContacts(prevContacts =>
            prevContacts.map(contact => {
              if (contact.assignedAssistant === null) {
                const randomIndex = Math.floor(Math.random() * assistants.length);
                return {
                  ...contact,
                  assignedAssistant: assistants[randomIndex],
                };
              }
              return contact;
            })
          );
        }
      }
    };
    fetchAssistants();
  }, [vapiPrivateKey]);

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
        name: customerName || selectedContact?.name || 'Unknown',
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
    if (!selectedAssistant?.id) {
      alert('Please select an assistant first');
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

      if (!vapiPhoneNumberId) {
        throw new Error('Phone Number ID not configured');
      }

      console.log('Starting call with:');
      console.log('Assistant ID:', selectedAssistant.id);
      console.log('Assistant Name:', selectedAssistant.name);
      console.log('Phone Number:', phoneToCall);
      console.log('API Key:', apiKey.substring(0, 10) + '...');

      const callPayload = {
        assistantId: selectedAssistant.id,
        phoneNumberId: vapiPhoneNumberId,
        customer: {
          number: phoneToCall,
          name: customerName || 'Guest',
        },
      };

      // If you want to pass the name as a variable override to the assistant
      if (customerName) {
        callPayload.assistantOverrides = {
          variableValues: {
            name: customerName,
          },
        };
      }

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
              // Randomly assign an assistant from available assistants
              let assignedAssistant = null;
              if (availableAssistants && availableAssistants.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableAssistants.length);
                assignedAssistant = availableAssistants[randomIndex];
                console.log(`Assigned assistant "${assignedAssistant.name}" to ${parts[nameIndex]}`);
              } else {
                console.warn(`No assistants available for ${parts[nameIndex]} - will assign when assistants load`);
              }
              contacts.push({
                id: contacts.length,
                name: parts[nameIndex] || 'Unknown',
                phoneNumber: parts[phoneIndex],
                assignedAssistant: assignedAssistant,
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

  const clearContacts = () => {
    setCsvContacts([]);
    setSelectedContact(null);
    setPhoneNumber('');
    setCustomerName('');
  };

  const updateContactAssistant = (contactId, assistant) => {
    setCsvContacts(csvContacts.map(contact =>
      contact.id === contactId
        ? { ...contact, assignedAssistant: assistant }
        : contact
    ));
  };

  const toggleContactSelection = (contactId) => {
    setSelectedContactIds(prev =>
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    );
  };

  const selectAllContacts = () => {
    if (selectedContactIds.length === csvContacts.length) {
      setSelectedContactIds([]);
    } else {
      setSelectedContactIds(csvContacts.map(c => c.id));
    }
  };

  const openEditModal = (contact) => {
    setEditingContactId(contact.id);
    setEditName(contact.name);
    setEditPhone(contact.phoneNumber);
    setShowEditModal(true);
  };

  const saveEditedContact = () => {
    setCsvContacts(csvContacts.map(contact =>
      contact.id === editingContactId
        ? { ...contact, name: editName, phoneNumber: editPhone }
        : contact
    ));
    setShowEditModal(false);
    setEditingContactId(null);
  };

  const batchCallSelectedContacts = async () => {
    if (selectedContactIds.length === 0) {
      alert('Please select at least one contact to call');
      return;
    }

    const selectedContacts = csvContacts.filter(c => selectedContactIds.includes(c.id));

    // Initialize status for all contacts
    const initialStatus = selectedContacts.map(contact => ({
      id: contact.id,
      name: contact.name,
      status: 'pending', // pending, queued, ringing, in-progress, completed, failed
      message: 'Waiting to call...',
      callId: null,
    }));

    setBatchCallStatus(initialStatus);
    setShowBatchCallStatus(true);

    try {
      // Validate and format phone numbers
      const validatedContacts = selectedContacts.map(contact => {
        let phoneToCall = contact.phoneNumber;
        phoneToCall = formatPhoneNumber(phoneToCall);

        if (!/^\+\d{1,15}$/.test(phoneToCall)) {
          return { ...contact, valid: false, formattedPhone: phoneToCall };
        }
        return { ...contact, valid: true, formattedPhone: phoneToCall };
      });

      // Mark invalid contacts as failed
      const invalidContacts = validatedContacts.filter(c => !c.valid);
      if (invalidContacts.length > 0) {
        setBatchCallStatus(prev =>
          prev.map(s =>
            invalidContacts.find(ic => ic.id === s.id)
              ? { ...s, status: 'failed', message: 'Invalid phone number format' }
              : s
          )
        );
      }

      // Build customers array for batch call
      const customers = validatedContacts
        .filter(c => c.valid)
        .map(contact => ({
          number: contact.formattedPhone,
          name: contact.name,
        }));

      if (customers.length === 0) {
        alert('No valid phone numbers to call');
        return;
      }

      // Build batch payload - call each contact with their assigned assistant
      const apiKey = vapiPrivateKey || vapiPublicKey;

      // For batch calling with different assistants, we need to make separate calls
      // Group contacts by assistant
      const contactsByAssistant = {};
      validatedContacts.filter(c => c.valid).forEach(contact => {
        const assistantId = contact.assignedAssistant?.id || 'default';
        if (!contactsByAssistant[assistantId]) {
          contactsByAssistant[assistantId] = [];
        }
        contactsByAssistant[assistantId].push(contact);
      });

      // Make batch calls for each assistant group
      const callIds = [];
      for (const [assistantId, contacts] of Object.entries(contactsByAssistant)) {
        // Update status to queued
        setBatchCallStatus(prev =>
          prev.map(s =>
            contacts.find(c => c.id === s.id)
              ? { ...s, status: 'queued', message: 'Call queued - preparing to dial...' }
              : s
          )
        );

        const batchPayload = {
          assistantId: assistantId === 'default' ? selectedAssistant?.id : assistantId,
          phoneNumberId: vapiPhoneNumberId,
          customers: contacts.map(c => ({
            number: c.formattedPhone,
            name: c.name,
          })),
        };

        // Add assistant overrides if available
        if (assistantId !== 'default') {
          batchPayload.assistantOverrides = {
            variableValues: {
              name: 'Customer',
            },
          };
        }

        console.log('Making batch call with payload:', batchPayload);

        const response = await fetch('https://api.vapi.ai/call', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(batchPayload),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Failed to make batch call:', errorData);
          setBatchCallStatus(prev =>
            prev.map(s =>
              contacts.find(c => c.id === s.id)
                ? { ...s, status: 'failed', message: `Failed: ${errorData.message || 'Unknown error'}` }
                : s
            )
          );
        } else {
          const responseData = await response.json();
          console.log('Batch call response:', responseData);

          // Handle response - could be array of calls or single call
          const calls = Array.isArray(responseData) ? responseData : [responseData];

          calls.forEach((call, index) => {
            const contact = contacts[index];
            if (contact) {
              callIds.push(call.id);
              // Update status to ringing
              setBatchCallStatus(prev =>
                prev.map(s =>
                  s.id === contact.id
                    ? {
                        ...s,
                        status: 'ringing',
                        message: `📞 Calling - Customer will hear ringing in ${expectedRingTime}s`,
                        callId: call.id,
                      }
                    : s
                )
              );
            }
          });
        }
      }

      // Start polling for call status
      if (callIds.length > 0) {
        pollCallStatus(callIds);
      }
    } catch (error) {
      console.error('Error in batch calling:', error);
      setBatchCallStatus(prev =>
        prev.map(s => ({ ...s, status: 'failed', message: `Error: ${error.message}` }))
      );
    }

    setSelectedContactIds([]);
  };

  const pollCallStatus = async (callIds) => {
    const completedCalls = new Set();
    let pollCount = 0;
    const maxPolls = 600; // Max 10 minutes of polling (600 * 1000ms = 10 min)

    const pollInterval = setInterval(async () => {
      pollCount++;

      // Stop polling after max time or if all calls are ended
      if (pollCount > maxPolls || completedCalls.size === callIds.length) {
        clearInterval(pollInterval);
        return;
      }

      for (const callId of callIds) {
        // Skip if already marked as completed
        if (completedCalls.has(callId)) {
          continue;
        }

        try {
          const callStatus = await vapiService.getCallStatus(callId, vapiPrivateKey);
          if (callStatus) {
            // Map VAPI status to display status
            let displayStatus = callStatus.status;
            let displayMessage = '';

            switch (callStatus.status) {
              case 'scheduled':
                displayMessage = '⏳ Call scheduled - waiting to start';
                break;
              case 'queued':
                displayMessage = '📦 Call queued - preparing to dial';
                break;
              case 'ringing':
                displayMessage = '📞 Ringing - Customer hearing dial tone';
                break;
              case 'in-progress':
                displayMessage = '✓ Call connected - conversation in progress';
                displayStatus = 'in-progress';
                break;
              case 'forwarding':
                displayMessage = '↩️ Call being forwarded';
                break;
              case 'ended':
                displayMessage = `✓ Call ended - ${callStatus.endedReason || 'Completed'}`;
                displayStatus = 'completed';
                completedCalls.add(callId); // Mark as completed to stop polling this call
                break;
              default:
                displayMessage = `${callStatus.status.charAt(0).toUpperCase() + callStatus.status.slice(1)}...`;
            }

            console.log(`[${callId.substring(0, 8)}] Status: ${callStatus.status} - ${displayMessage}`);

            // Update the status for this specific call
            setBatchCallStatus(prev =>
              prev.map(s =>
                s.callId === callId
                  ? {
                      ...s,
                      status: displayStatus,
                      message: displayMessage,
                    }
                  : s
              )
            );
          }
        } catch (error) {
          console.error(`Error polling call status for ${callId}:`, error);
        }
      }
    }, 500); // Poll every 500ms for truly real-time updates

    // Cleanup interval on component unmount
    return () => clearInterval(pollInterval);
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
        <>
          {selectedAssistant && (
            <div style={{
              padding: '16px',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '12px',
              border: '2px solid #667eea',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '4px' }}>
                  Active Assistant
                </div>
                <div style={{ fontSize: '16px', fontWeight: '600', color: '#fff' }}>
                  {selectedAssistant.name}
                </div>
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
              }}>
                {selectedAssistant.voiceId && (
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Voice: {selectedAssistant.voiceId}
                  </div>
                )}
                {selectedAssistant.model && (
                  <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Model: {typeof selectedAssistant.model === 'string' ? selectedAssistant.model : selectedAssistant.model?.model || 'N/A'}
                  </div>
                )}
              </div>
            </div>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1.2fr',
            gap: '16px',
            padding: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>

          <div>
            <label style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', display: 'block', marginBottom: '8px' }}>
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="John Doe"
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
            <button
              onClick={() => setShowImportModal(true)}
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
            </button>
          </div>
        </div>
        </>
      )}

      {csvContacts.length > 0 && !isCallActive && (
        <div style={{
          padding: '16px',
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
            <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', fontWeight: '600' }}>
              Loaded Contacts ({csvContacts.length})
              {selectedContactIds.length > 0 && (
                <span style={{ marginLeft: '8px', color: '#667eea' }}>
                  - {selectedContactIds.length} selected
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {selectedContactIds.length > 0 && (
                <button
                  onClick={batchCallSelectedContacts}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#10b981',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                  title="Batch call selected contacts"
                >
                  Batch Call ({selectedContactIds.length})
                </button>
              )}
              <button
                onClick={selectAllContacts}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid rgba(102, 126, 234, 0.5)',
                  backgroundColor: selectedContactIds.length === csvContacts.length ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                  color: '#667eea',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
                title="Select all contacts"
              >
                {selectedContactIds.length === csvContacts.length ? 'Deselect All' : 'Select All'}
              </button>
              <button
                onClick={clearContacts}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: 'rgba(239, 68, 68, 0.2)',
                  color: '#fca5a5',
                  fontSize: '12px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
                title="Clear all contacts"
              >
                Clear
              </button>
            </div>
          </div>
          <div style={{
            overflowX: 'auto',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '13px',
            }}>
              <thead>
                <tr style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                  <th style={{
                    padding: '10px 12px',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '600',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    width: '50px',
                  }}>
                    <input
                      type="checkbox"
                      checked={selectedContactIds.length === csvContacts.length && csvContacts.length > 0}
                      onChange={selectAllContacts}
                      style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                    />
                  </th>
                  <th style={{
                    padding: '10px 12px',
                    textAlign: 'left',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '600',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>Name</th>
                  <th style={{
                    padding: '10px 12px',
                    textAlign: 'left',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '600',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>Phone Number</th>
                  <th style={{
                    padding: '10px 12px',
                    textAlign: 'left',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '600',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  }}>Assistant</th>
                  <th style={{
                    padding: '10px 12px',
                    textAlign: 'center',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '600',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    width: '80px',
                  }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {csvContacts.map((contact) => (
                  <tr
                    key={contact.id}
                    style={{
                      backgroundColor: selectedContactIds.includes(contact.id) ? 'rgba(102, 126, 234, 0.15)' : 'transparent',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    <td style={{
                      padding: '10px 12px',
                      textAlign: 'center',
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedContactIds.includes(contact.id)}
                        onChange={() => toggleContactSelection(contact.id)}
                        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
                      />
                    </td>
                    <td style={{
                      padding: '10px 12px',
                      color: '#fff',
                      fontWeight: '400',
                    }}>
                      {contact.name}
                    </td>
                    <td style={{
                      padding: '10px 12px',
                      color: selectedContact?.id === contact.id ? '#10b981' : 'rgba(255, 255, 255, 0.8)',
                      fontFamily: 'monospace',
                      fontWeight: selectedContact?.id === contact.id ? '600' : '400',
                    }}>
                      {contact.phoneNumber}
                    </td>
                    <td style={{
                      padding: '8px 12px',
                      color: selectedContact?.id === contact.id ? '#10b981' : 'rgba(255, 255, 255, 0.8)',
                      fontWeight: selectedContact?.id === contact.id ? '600' : '400',
                    }}>
                      <select
                        value={contact.assignedAssistant?.id || ''}
                        onChange={(e) => {
                          const assistantId = e.target.value;
                          const assistant = availableAssistants.find(a => a.id === assistantId) || null;
                          updateContactAssistant(contact.id, assistant);
                        }}
                        style={{
                          padding: '6px 8px',
                          borderRadius: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#fff',
                          fontSize: '12px',
                          cursor: 'pointer',
                          fontFamily: 'inherit',
                          minWidth: '120px',
                        }}
                      >
                        {availableAssistants.map((assistant) => (
                          <option key={assistant.id} value={assistant.id}>
                            {assistant.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                      <button
                        onClick={() => openEditModal(contact)}
                        style={{
                          padding: '4px 10px',
                          borderRadius: '4px',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: 'rgba(255, 255, 255, 0.7)',
                          fontSize: '11px',
                          cursor: 'pointer',
                          fontWeight: '400',
                        }}
                        title="Edit contact details"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {csvContacts.length === 0 && (
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
              disabled={callStatus === 'connecting' || callStatus === 'ending' || (!phoneNumber && !selectedContact) || (!selectedAssistant && !isCallActive)}
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
                cursor: (callStatus === 'connecting' || callStatus === 'ending' || (!phoneNumber && !selectedContact) || (!selectedAssistant && !isCallActive)) ? 'not-allowed' : 'pointer',
                opacity: (callStatus === 'connecting' || callStatus === 'ending' || (!phoneNumber && !selectedContact) || (!selectedAssistant && !isCallActive)) ? 0.6 : 1,
              }}
              title={isCallActive ? 'End Call' : 'Start Call'}
            >
              {isCallActive ? <PhoneOff size={28} /> : <Phone size={28} />}
            </button>
          </div>
        </div>
      )}

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

      {showImportModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#1a202c',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#fff' }}>
                Import Contacts from CSV
              </h3>
              <button
                onClick={() => setShowImportModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)' }}>
                CSV Format Template
              </h4>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.8)',
                overflowX: 'auto',
              }}>
                <div>name,phone</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>John Smith,+1-202-555-0173</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Sarah Johnson,+1-202-555-0174</div>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)' }}>Michael Brown,+1-202-555-0175</div>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '600', color: 'rgba(255, 255, 255, 0.9)' }}>
                Instructions
              </h4>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '13px',
                lineHeight: '1.6',
              }}>
                <li>First row must contain headers: <code style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', padding: '2px 6px', borderRadius: '3px' }}>name,phone</code></li>
                <li>Each subsequent row should contain a contact name and phone number</li>
                <li>Phone numbers should be in E.164 format (e.g., +1-202-555-0173) or will be auto-formatted</li>
                <li>Save the file as CSV format (.csv)</li>
              </ul>
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setShowImportModal(false)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Cancel
              </button>
              <label
                htmlFor="csv-upload-modal"
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#667eea',
                  color: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Upload size={16} />
                Choose File & Import
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => {
                  handleCSVUpload(e);
                  setShowImportModal(false);
                }}
                style={{ display: 'none' }}
                id="csv-upload-modal"
              />
            </div>
          </div>
        </div>
      )}

      {showBatchCallStatus && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001,
        }}>
          <div style={{
            backgroundColor: '#1a202c',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#fff' }}>
                Batch Call Status
              </h3>
              <button
                onClick={() => setShowBatchCallStatus(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{
              marginBottom: '16px',
              padding: '12px',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '8px',
              borderLeft: '4px solid #667eea',
            }}>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Expected Ring Time: <strong>{expectedRingTime} seconds</strong>
              </div>
              <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.5)', marginTop: '4px' }}>
                Customers will hear ringing {expectedRingTime} seconds after call initiation
              </div>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}>
              {batchCallStatus.map((status) => (
                <div
                  key={status.id}
                  style={{
                    padding: '12px',
                    borderRadius: '8px',
                    backgroundColor:
                      status.status === 'pending'
                        ? 'rgba(255, 255, 255, 0.05)'
                        : status.status === 'calling'
                        ? 'rgba(59, 130, 246, 0.15)'
                        : status.status === 'completed'
                        ? 'rgba(16, 185, 129, 0.15)'
                        : 'rgba(239, 68, 68, 0.15)',
                    border:
                      status.status === 'pending'
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : status.status === 'calling'
                        ? '1px solid rgba(59, 130, 246, 0.3)'
                        : status.status === 'completed'
                        ? '1px solid rgba(16, 185, 129, 0.3)'
                        : '1px solid rgba(239, 68, 68, 0.3)',
                  }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <div style={{
                        fontSize: '13px',
                        fontWeight: '500',
                        color:
                          status.status === 'pending'
                            ? 'rgba(255, 255, 255, 0.8)'
                            : status.status === 'calling'
                            ? '#3b82f6'
                            : status.status === 'completed'
                            ? '#10b981'
                            : '#ef4444',
                      }}>
                        {status.name}
                      </div>
                      <div style={{
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: '4px',
                      }}>
                        {status.message}
                      </div>
                    </div>
                    <div style={{
                      fontSize: '18px',
                      marginLeft: '12px',
                    }}>
                      {status.status === 'pending' && '⏳'}
                      {status.status === 'calling' && '📞'}
                      {status.status === 'completed' && '✓'}
                      {status.status === 'failed' && '✕'}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: '20px',
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setShowBatchCallStatus(false)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#667eea',
                  color: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            backgroundColor: '#1a202c',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#fff' }}>
                Edit Contact
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontSize: '24px',
                  cursor: 'pointer',
                  padding: 0,
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px',
                fontWeight: '500',
              }}>
                Contact Name
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
                placeholder="Enter name"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '8px',
                fontWeight: '500',
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
                placeholder="Enter phone number"
              />
            </div>

            <div style={{
              display: 'flex',
              gap: '12px',
              justifyContent: 'flex-end',
            }}>
              <button
                onClick={() => setShowEditModal(false)}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveEditedContact}
                style={{
                  padding: '10px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#667eea',
                  color: '#fff',
                  fontSize: '14px',
                  cursor: 'pointer',
                  fontWeight: '500',
                }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
