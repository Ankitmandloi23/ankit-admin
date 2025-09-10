import React from 'react';
import { TrendingUp, TrendingDown, Activity, Users } from 'lucide-react';

const Analytics = () => {
  const metrics = [
    { label: 'Page Views', value: '125,432', change: '+12.5%', trend: 'up' },
    { label: 'Unique Visitors', value: '45,123', change: '+8.2%', trend: 'up' },
    { label: 'Bounce Rate', value: '32.1%', change: '-2.4%', trend: 'down' },
    { label: 'Session Duration', value: '4m 32s', change: '+15.3%', trend: 'up' },
  ];

  return (
    <div className="analytics-page">
      <div className="page-header">
        <h1>Analytics</h1>
        <p>Track your website performance and user engagement</p>
      </div>
      
      <div className="analytics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="analytics-card">
            <div className="analytics-card-header">
              <h3>{metric.label}</h3>
              {metric.trend === 'up' ? (
                <TrendingUp className="trend-icon trend-up" size={20} />
              ) : (
                <TrendingDown className="trend-icon trend-down" size={20} />
              )}
            </div>
            <div className="analytics-card-body">
              <div className="metric-value">{metric.value}</div>
              <div className={`metric-change ${metric.trend === 'up' ? 'positive' : 'negative'}`}>
                {metric.change}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="analytics-charts">
        <div className="chart-container">
          <h3>Traffic Overview</h3>
          <div className="chart-placeholder">
            <Activity size={48} />
            <p>Chart visualization would go here</p>
          </div>
        </div>
        
        <div className="chart-container">
          <h3>User Demographics</h3>
          <div className="chart-placeholder">
            <Users size={48} />
            <p>User demographics chart would go here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;