import { Copy, Download } from 'lucide-react';
import { useState } from 'react';

export default function CallLogs({ callHistory }) {
  const [expandedCallId, setExpandedCallId] = useState(null);

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
          Call History ({callHistory.length})
        </h3>
      </div>

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

      {/* Expanded Transcript View */}
      {expandedCallId && (
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
    </div>
  );
}
