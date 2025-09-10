import React from 'react';
import { User, ShoppingCart, Settings, Bell } from 'lucide-react';

const RecentActivity = () => {
  const activities = [
    {
      id: 1,
      type: 'user',
      message: 'New user registered',
      user: 'John Doe',
      time: '2 minutes ago',
      icon: User
    },
    {
      id: 2,
      type: 'order',
      message: 'New order placed',
      user: 'Jane Smith',
      time: '5 minutes ago',
      icon: ShoppingCart
    },
    {
      id: 3,
      type: 'settings',
      message: 'Settings updated',
      user: 'Admin',
      time: '10 minutes ago',
      icon: Settings
    },
    {
      id: 4,
      type: 'notification',
      message: 'System notification sent',
      user: 'System',
      time: '15 minutes ago',
      icon: Bell
    }
  ];

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <h3>Recent Activity</h3>
        <button className="view-all-btn">View All</button>
      </div>
      <div className="activity-list">
        {activities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="activity-item">
              <div className={`activity-icon activity-${activity.type}`}>
                <Icon size={16} />
              </div>
              <div className="activity-content">
                <p className="activity-message">{activity.message}</p>
                <div className="activity-meta">
                  <span className="activity-user">{activity.user}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentActivity;