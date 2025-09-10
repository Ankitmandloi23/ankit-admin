import React from 'react';

const StatsCard = ({ title, value, change, changeType, icon: Icon, color }) => {
  return (
    <div className={`stats-card stats-card-${color}`}>
      <div className="stats-card-header">
        <div className="stats-icon">
          <Icon size={24} />
        </div>
        <div className={`stats-change ${changeType}`}>
          {change}
        </div>
      </div>
      <div className="stats-card-body">
        <h3 className="stats-title">{title}</h3>
        <div className="stats-value">{value}</div>
      </div>
    </div>
  );
};

export default StatsCard;