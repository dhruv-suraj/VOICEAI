import { Copy, Download } from 'lucide-react';
import { useState, useEffect } from 'react';
import { vapiService } from '../services/vapiService';

export default function CallLogs({ callHistory, vapiPrivateKey }) {
  const [expandedCallId, setExpandedCallId] = useState(null);
  const [vapiCallLogs, setVapiCallLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('vapi'); // 'vapi' or 'local'

  // Fetch VAPI call logs when component mounts
  useEffect(() => {
    if (activeTab === 'vapi' && vapiPrivateKey) {
      fetchVapiCallLogs();
    }
  }, [activeTab, vapiPrivateKey]);

  const fetchVapiCallLogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const logs = await vapiService.fetchCallLogs(vapiPrivateKey, 100);
      setVapiCallLogs(logs);
    } catch (err) {
      setError('Failed to fetch call logs from VAPI');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const copyTranscript = (transcript) => {
    navigator.clipboard.writeText(transcript);
  };

  const downloadTranscript = (transcript, name, timestamp) => {
    const element = document.createElement('a');
    const file = new Blob([transcript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `transcript_${name}_${timestamp}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
      }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#fff' }}>
          Call Logs
        </h3>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        marginBottom: '16px',
      }}>
        <button
          onClick={() => setActiveTab('vapi')}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderBottom: activeTab === 'vapi' ? '2px solid #667eea' : '2px solid transparent',
            backgroundColor: 'transparent',
            color: activeTab === 'vapi' ? '#667eea' : 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeTab === 'vapi' ? '600' : '400',
            transition: 'all 0.2s',
          }}
        >
          VOICE AI Call Logs ({vapiCallLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('local')}
          style={{
            padding: '10px 16px',
            border: 'none',
            borderBottom: activeTab === 'local' ? '2px solid #667eea' : '2px solid transparent',
            backgroundColor: 'transparent',
            color: activeTab === 'local' ? '#667eea' : 'rgba(255, 255, 255, 0.6)',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: activeTab === 'local' ? '600' : '400',
            transition: 'all 0.2s',
          }}
        >
          Local History ({callHistory.length})
        </button>
      </div>

      {/* VAPI Call Logs Tab */}
      {activeTab === 'vapi' && (
        <>
          {isLoading ? (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.7)',
            }}>
              Loading call logs...
            </div>
          ) : error ? (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#fca5a5',
            }}>
              {error}
            </div>
          ) : vapiCallLogs.length === 0 ? (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              No call logs available from VAPI
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              {/* VAPI Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '100px 120px 140px 140px 80px 120px 120px 100px 100px',
                gap: '12px',
                padding: '12px',
                backgroundColor: 'rgba(102, 126, 234, 0.25)',
                borderRadius: '8px 8px 0 0',
                marginBottom: '8px',
                fontWeight: '700',
                fontSize: '11px',
                color: '#ffffff',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'sticky',
                top: 0,
              }}>
                <div>Call ID</div>
                <div>Assistant</div>
                <div>Assistant Phone</div>
                <div>Customer Phone</div>
                <div>Duration</div>
                <div>Start Time</div>
                <div>End Reason</div>
                <div>Transcript</div>
                <div>Recording</div>
              </div>

              {/* VAPI Table Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {vapiCallLogs.map((call) => (
                  <div
                    key={call.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '100px 120px 140px 140px 80px 120px 120px 100px 100px',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: 'rgba(45, 55, 90, 0.6)',
                      borderRadius: '8px',
                      border: '1px solid rgba(102, 126, 234, 0.3)',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: '#ffffff',
                    }}
                  >
                    {/* Call ID */}
                    <div style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: '#88ccff',
                      fontWeight: '600',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }} title={call.id}>
                      {call.id?.substring(0, 8)}...
                    </div>

                    {/* Assistant */}
                    <div style={{ fontWeight: '600', color: '#ffffff' }}>
                      {call.assistant?.name || call.assistantId || 'N/A'}
                    </div>

                    {/* Assistant Phone */}
                    <div style={{ fontSize: '11px', color: '#e0e0e0', fontFamily: 'monospace' }}>
                      {call.assistantPhoneNumber || call.phoneNumberId || 'N/A'}
                    </div>

                    {/* Customer Phone */}
                    <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#e0e0e0' }}>
                      {call.customer?.number || call.customerNumber || 'N/A'}
                    </div>

                    {/* Duration */}
                    <div style={{ color: '#4ade80', fontWeight: '500' }}>
                      {call.duration ? formatDuration(Math.round(call.duration / 1000)) : 'N/A'}
                    </div>

                    {/* Start Time */}
                    <div style={{ fontSize: '11px', color: '#c9d1d9' }}>
                      {call.startedAt ? new Date(call.startedAt).toLocaleString() : 'N/A'}
                    </div>

                    {/* End Reason */}
                    <div style={{ fontSize: '11px', color: '#e0e0e0' }}>
                      {call.endedReason || call.status || 'N/A'}
                    </div>

                    {/* Transcript */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {call.transcript ? (
                        <button
                          onClick={() => setExpandedCallId(expandedCallId === call.id ? null : call.id)}
                          style={{
                            padding: '4px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: 'rgba(59, 130, 246, 0.3)',
                            color: '#60a5fa',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.5)';
                            e.currentTarget.style.color = '#93c5fd';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
                            e.currentTarget.style.color = '#60a5fa';
                          }}
                          title="View transcript"
                        >
                          View
                        </button>
                      ) : (
                        <span style={{ color: '#666', fontSize: '11px' }}>—</span>
                      )}
                    </div>

                    {/* Recording */}
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {call.recordingUrl ? (
                        <button
                          onClick={() => window.open(call.recordingUrl, '_blank')}
                          style={{
                            padding: '4px 12px',
                            borderRadius: '4px',
                            border: 'none',
                            backgroundColor: 'rgba(34, 197, 94, 0.3)',
                            color: '#4ade80',
                            fontSize: '11px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.5)';
                            e.currentTarget.style.color = '#86efac';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(34, 197, 94, 0.3)';
                            e.currentTarget.style.color = '#4ade80';
                          }}
                          title="Play recording"
                        >
                          Play
                        </button>
                      ) : (
                        <span style={{ color: '#666', fontSize: '11px' }}>—</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Local History Tab */}
      {activeTab === 'local' && (
        <>
          {callHistory.length === 0 ? (
            <div style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              No calls yet. Start making calls to see them here!
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              {/* Table Header */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '120px 150px 100px 200px 180px 120px',
                gap: '12px',
                padding: '12px',
                backgroundColor: 'rgba(102, 126, 234, 0.15)',
                borderRadius: '8px 8px 0 0',
                marginBottom: '8px',
                fontWeight: '600',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.8)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                position: 'sticky',
                top: 0,
              }}>
                <div>Name</div>
                <div>Phone Number</div>
                <div>Duration</div>
                <div>Timestamp</div>
                <div>Transcript Preview</div>
                <div>Actions</div>
              </div>

              {/* Table Body */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {callHistory.map((call) => (
                  <div
                    key={call.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '120px 150px 100px 200px 180px 120px',
                      gap: '12px',
                      padding: '12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      alignItems: 'center',
                      fontSize: '12px',
                      color: 'rgba(255, 255, 255, 0.9)',
                    }}
                  >
                    {/* Name */}
                    <div style={{ fontWeight: '600', color: '#fff' }}>{call.name}</div>

                    {/* Phone Number */}
                    <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{call.phoneNumber}</div>

                    {/* Duration */}
                    <div>{formatDuration(call.duration)}</div>

                    {/* Timestamp */}
                    <div style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)' }}>
                      {call.timestamp}
                    </div>

                    {/* Transcript Preview */}
                    <div
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        padding: '8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: 'rgba(255, 255, 255, 0.8)',
                        maxHeight: '50px',
                        overflowY: 'auto',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        fontFamily: 'monospace',
                      }}
                      title={call.transcript || 'No transcript'}
                    >
                      {call.transcript ? call.transcript.substring(0, 80) + '...' : 'No transcript'}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => copyTranscript(call.transcript)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: 'rgba(59, 130, 246, 0.2)',
                          color: '#3b82f6',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                        title="Copy transcript"
                      >
                        <Copy size={12} />
                      </button>
                      <button
                        onClick={() => downloadTranscript(call.transcript, call.name, call.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          color: '#22c55e',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                        title="Download transcript"
                      >
                        <Download size={12} />
                      </button>
                      <button
                        onClick={() => setExpandedCallId(expandedCallId === call.id ? null : call.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          border: 'none',
                          backgroundColor: 'rgba(168, 85, 247, 0.2)',
                          color: '#a855f7',
                          fontSize: '10px',
                          cursor: 'pointer',
                        }}
                        title="View full transcript"
                      >
                        {expandedCallId === call.id ? 'Hide' : 'View'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Expanded View - Local History */}
      {activeTab === 'local' && expandedCallId && (
        <div style={{
          padding: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: '8px',
        }}>
          {callHistory.find((c) => c.id === expandedCallId) && (
            <>
              <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                Full Transcript - {callHistory.find((c) => c.id === expandedCallId)?.name}
              </h4>
              <div style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                padding: '12px',
                borderRadius: '6px',
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '13px',
                lineHeight: '1.6',
                maxHeight: '300px',
                overflowY: 'auto',
                fontFamily: 'monospace',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}>
                {callHistory.find((c) => c.id === expandedCallId)?.transcript || 'No transcript available'}
              </div>
            </>
          )}
        </div>
      )}

      {/* Expanded View - VAPI Call Logs */}
      {activeTab === 'vapi' && expandedCallId && (
        <div style={{
          padding: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          marginTop: '8px',
        }}>
          {vapiCallLogs.find((c) => c.id === expandedCallId) && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Call Transcript */}
                <div>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                    Call Transcript
                  </h4>
                  <div style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    padding: '12px',
                    borderRadius: '6px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '13px',
                    lineHeight: '1.6',
                    maxHeight: '300px',
                    overflowY: 'auto',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {vapiCallLogs.find((c) => c.id === expandedCallId)?.transcript || 'No transcript available'}
                  </div>
                </div>

                {/* Recording */}
                {vapiCallLogs.find((c) => c.id === expandedCallId)?.recordingUrl && (
                  <div>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600', color: '#fff' }}>
                      Call Recording
                    </h4>
                    <audio
                      controls
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '6px',
                      }}
                    >
                      <source src={vapiCallLogs.find((c) => c.id === expandedCallId)?.recordingUrl} type="audio/mpeg" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
