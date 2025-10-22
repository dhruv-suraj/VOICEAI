import { TrendingUp, BarChart3 } from 'lucide-react';

export default function Metrics({ callHistory }) {
  const totalCalls = callHistory.length;
  const totalDuration = callHistory.reduce((sum, call) => sum + call.duration, 0);
  const avgDuration = totalCalls > 0 ? Math.floor(totalDuration / totalCalls) : 0;
  const successRate = totalCalls > 0 ? 100 : 0; // All calls in history are successful

  const formatDuration = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs}h ${mins}m ${secs}s`;
    }
    return `${mins}m ${secs}s`;
  };

  const MetricCard = ({ title, value, unit, change, icon: Icon }) => (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <p style={{ color: '#718096', fontSize: '13px', margin: 0 }}>{title}</p>
        {Icon && <Icon size={20} color="#667eea" />}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: '12px' }}>
        <span style={{ fontSize: '28px', fontWeight: '700', color: '#667eea' }}>{value}</span>
        {unit && <span style={{ color: '#a0aec0', fontSize: '12px' }}>{unit}</span>}
      </div>
      {change && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#667eea', fontSize: '12px' }}>
          <TrendingUp size={12} />
          <span>{change}</span>
        </div>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        <MetricCard
          icon={BarChart3}
          title="Total Calls"
          value={totalCalls.toString()}
          change={totalCalls > 0 ? `+${totalCalls} calls` : 'No calls yet'}
        />
        <MetricCard
          icon={BarChart3}
          title="Avg Duration"
          value={formatDuration(avgDuration)}
          change={totalCalls > 0 ? `+${Math.floor(avgDuration)}s avg` : 'N/A'}
        />
        <MetricCard
          icon={BarChart3}
          title="Total Duration"
          value={formatDuration(totalDuration)}
          change={totalCalls > 0 ? `${totalCalls} calls` : 'No data'}
        />
        <MetricCard
          icon={BarChart3}
          title="Success Rate"
          value={successRate.toFixed(1) + '%'}
          change={totalCalls > 0 ? `${totalCalls}/${totalCalls} successful` : 'N/A'}
        />
      </div>

      {/* Call Success and Chart */}
      <div style={{ display: 'flex', gap: '32px' }}>
        {/* Call Success */}
        <div style={{ flex: '0 0 280px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 20px 0', color: '#fff' }}>Call Success</h4>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '64px', fontWeight: '700', marginBottom: '8px', lineHeight: '1', color: '#fff' }}>
              {successRate.toFixed(0)}%
            </div>
            <div style={{ fontSize: '13px' }}>
              <span style={{ color: '#fff' }}>{totalCalls > 0 ? '100.0%' : 'No data'}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', marginLeft: '8px' }}>
                {totalCalls > 0 ? 'All calls successful' : 'Make your first call'}
              </span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 20px 0', color: '#fff' }}>
            Call Activity
          </h4>
          {callHistory.length > 0 ? (
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '20px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)',
            }}>
              <svg viewBox="0 0 1200 300" style={{ width: '100%', height: '220px', marginBottom: '16px' }}>
                <line x1="0" y1="250" x2="1200" y2="250" stroke="#e2e8f0" strokeWidth="1" />
                <line x1="0" y1="200" x2="1200" y2="200" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                <line x1="0" y1="150" x2="1200" y2="150" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                <line x1="0" y1="100" x2="1200" y2="100" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />
                <line x1="0" y1="50" x2="1200" y2="50" stroke="#e2e8f0" strokeWidth="1" opacity="0.5" />

                {/* Generate chart line based on call history */}
                {callHistory.length > 0 && (
                  <polyline
                    points={callHistory.map((call, idx) => {
                      const x = (idx / (callHistory.length - 1 || 1)) * 1200;
                      const y = 250 - (call.duration / 300) * 200; // Scale duration to chart
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#667eea"
                    strokeWidth="2.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#a0aec0' }}>
                {callHistory.slice(-10).map((call, idx) => (
                  <span key={idx}>{new Date(call.timestamp).toLocaleDateString()}</span>
                ))}
              </div>
            </div>
          ) : (
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              padding: '40px 20px',
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 0.5)',
            }}>
              No call data yet. Start making calls to see metrics!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
