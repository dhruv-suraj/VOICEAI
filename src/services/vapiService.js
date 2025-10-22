// Service to interact with VAPI API
const VAPI_API_BASE = 'https://api.vapi.ai';

export const vapiService = {
  // Fetch all assistants from VAPI
  async fetchAssistants(privateKey) {
    try {
      const response = await fetch(`${VAPI_API_BASE}/assistant`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${privateKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch assistants: ${response.statusText}`);
      }

      const data = await response.json();
      return data.assistants || data || [];
    } catch (error) {
      console.error('Error fetching assistants:', error);
      return [];
    }
  },

  // Fetch a specific assistant by ID
  async fetchAssistant(assistantId, privateKey) {
    try {
      const response = await fetch(`${VAPI_API_BASE}/assistant/${assistantId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${privateKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch assistant: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching assistant:', error);
      return null;
    }
  },

  // Get assistant details including configuration
  async getAssistantDetails(assistantId, privateKey) {
    const assistant = await this.fetchAssistant(assistantId, privateKey);
    if (assistant) {
      return {
        id: assistant.id,
        name: assistant.name,
        voiceId: assistant.voiceId,
        voice: assistant.voice,
        model: assistant.model,
        systemPrompt: assistant.systemPrompt,
        firstMessage: assistant.firstMessage,
        backchannelingEnabled: assistant.backchannelingEnabled,
        endCallMessage: assistant.endCallMessage,
        transcriber: assistant.transcriber,
        fullConfig: assistant,
      };
    }
    return null;
  },

  // Fetch call logs from VAPI
  async fetchCallLogs(privateKey, limit = 100) {
    try {
      const response = await fetch(`${VAPI_API_BASE}/call?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${privateKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch call logs: ${response.statusText}`);
      }

      const data = await response.json();
      return data.calls || data || [];
    } catch (error) {
      console.error('Error fetching call logs:', error);
      return [];
    }
  },

  // Fetch a specific call by ID
  async fetchCall(callId, privateKey) {
    try {
      const response = await fetch(`${VAPI_API_BASE}/call/${callId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${privateKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch call: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching call:', error);
      return null;
    }
  },

  // Make batch calls using customers parameter
  async makeBatchCalls(batchPayload, privateKey) {
    try {
      const response = await fetch(`${VAPI_API_BASE}/call`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${privateKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(batchPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to make batch calls: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error making batch calls:', error);
      throw error;
    }
  },

  // Poll for call status
  async getCallStatus(callId, privateKey) {
    try {
      const call = await this.fetchCall(callId, privateKey);
      if (call) {
        return {
          id: call.id,
          status: call.status, // scheduled, queued, ringing, in-progress, forwarding, ended
          endedReason: call.endedReason,
          duration: call.duration,
          messages: call.messages || [],
          recording: call.recording,
          transcript: call.transcript,
        };
      }
      return null;
    } catch (error) {
      console.error('Error getting call status:', error);
      return null;
    }
  },
};
