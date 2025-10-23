import { useState, useEffect } from 'react';
import { ChevronDown, Loader } from 'lucide-react';
import { vapiService } from '../services/vapiService';

export default function AssistantSelector({
  vapiPrivateKey,
  selectedAssistantId,
  onAssistantChange,
  assistantDetails
}) {
  const [assistants, setAssistants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (vapiPrivateKey) {
      loadAssistants();
    }
  }, [vapiPrivateKey]);

  const loadAssistants = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await vapiService.fetchAssistants(vapiPrivateKey);
      setAssistants(data);
    } catch (err) {
      setError('Failed to load assistants');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectedAssistant = assistants.find(a => a.id === selectedAssistantId);
  const [buttonRect, setButtonRect] = useState(null);
  const buttonRef = useEffect(() => {
    const button = document.querySelector('[data-assistant-button]');
    if (button && isDropdownOpen) {
      setButtonRect(button.getBoundingClientRect());
    }
  }, [isDropdownOpen]);

  return (
    <div style={{
      position: 'relative',
      minWidth: '250px',
    }}>
      <button
        data-assistant-button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: '#fff',
          fontSize: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1,
        }}
        disabled={isLoading}
      >
        <span>
          {isLoading ? 'Loading assistants...' : selectedAssistant ? selectedAssistant.name : 'Select Assistant'}
        </span>
        {isLoading ? (
          <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
        ) : (
          <ChevronDown size={16} style={{ transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
        )}
      </button>

      {error && (
        <div style={{
          padding: '8px',
          marginTop: '4px',
          borderRadius: '6px',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: '#fca5a5',
          fontSize: '12px',
        }}>
          {error}
        </div>
      )}

      {isDropdownOpen && !isLoading && buttonRect && (
        <div style={{
          position: 'fixed',
          top: buttonRect.bottom + 4,
          left: buttonRect.left,
          width: buttonRect.width,
          backgroundColor: '#2d3748',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          maxHeight: '300px',
          overflowY: 'auto',
          zIndex: 9999,
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
        }}>
          {assistants.length === 0 ? (
            <div style={{
              padding: '12px',
              color: 'rgba(255, 255, 255, 0.5)',
              fontSize: '13px',
              textAlign: 'center',
            }}>
              No assistants found
            </div>
          ) : (
            assistants.map((assistant) => (
              <button
                key={assistant.id}
                onClick={() => {
                  onAssistantChange(assistant);
                  setIsDropdownOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: 'none',
                  backgroundColor: selectedAssistantId === assistant.id ? 'rgba(102, 126, 234, 0.2)' : 'transparent',
                  color: '#fff',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '13px',
                  transition: 'background-color 0.2s',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                }}
                onMouseEnter={(e) => {
                  if (selectedAssistantId !== assistant.id) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedAssistantId !== assistant.id) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <div style={{ fontWeight: '500' }}>{assistant.name}</div>
                {assistant.firstMessage && (
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginTop: '4px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {assistant.firstMessage}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      )}

      {selectedAssistant && assistantDetails && (
        <div style={{
          marginTop: '12px',
          padding: '12px',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '8px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
          borderLeft: '3px solid #667eea',
        }}>
          <div style={{ marginBottom: '8px', fontWeight: '600', color: '#fff' }}>
            Assistant Details
          </div>
          {assistantDetails.voiceId && (
            <div style={{ marginBottom: '4px' }}>
              <strong>Voice:</strong> {assistantDetails.voiceId}
            </div>
          )}
          {assistantDetails.model && (
            <div style={{ marginBottom: '4px' }}>
              <strong>Model:</strong> {typeof assistantDetails.model === 'string' ? assistantDetails.model : assistantDetails.model?.model || 'N/A'}
            </div>
          )}
          {assistantDetails.systemPrompt && (
            <div style={{ marginBottom: '4px' }}>
              <strong>System Prompt:</strong>
              <div style={{
                marginTop: '4px',
                padding: '6px',
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '4px',
                maxHeight: '100px',
                overflow: 'auto',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: '11px',
              }}>
                {assistantDetails.systemPrompt}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
