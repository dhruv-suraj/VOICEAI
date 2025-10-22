export default function StructuredOutputs({ callHistory }) {
  return (
    <div style={{
      padding: '40px 20px',
      textAlign: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '12px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.7)',
    }}>
      <h3 style={{ margin: '0 0 12px 0', color: '#fff', fontSize: '18px' }}>Structured Outputs</h3>
      <p>View and manage structured data extracted from calls.</p>
      <p style={{ fontSize: '12px', marginTop: '8px', color: 'rgba(255, 255, 255, 0.5)' }}>
        {callHistory.length > 0 ? `${callHistory.length} calls analyzed` : 'No data available yet'}
      </p>
    </div>
  );
}
