import React from 'react';
import { BarChart3 } from 'lucide-react';

const Chart = () => {
  return (
    <div className="chart-widget">
      <div className="chart-header">
        <h3>Revenue Overview</h3>
        <select className="chart-period">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 3 months</option>
        </select>
      </div>
      <div className="chart-content">
        <div className="chart-placeholder">
          <BarChart3 size={48} />
          <p>Chart visualization would be rendered here</p>
          <p className="chart-note">Integration with charting library like Chart.js or Recharts</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;