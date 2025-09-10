import React from 'react';
import StatsCard from '../components/StatsCard';
import Chart from '../components/Chart';
import RecentActivity from '../components/RecentActivity';
import { Users, DollarSign, ShoppingCart, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '12,345',
      change: '+12%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Revenue',
      value: '$45,678',
      change: '+8%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Orders',
      value: '1,234',
      change: '-3%',
      changeType: 'negative',
      icon: ShoppingCart,
      color: 'orange'
    },
    {
      title: 'Growth',
      value: '23%',
      change: '+15%',
      changeType: 'positive',
      icon: TrendingUp,
      color: 'purple'
    }
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your business today.</p>
      </div>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>
      
      <div className="dashboard-grid">
        <div className="chart-section">
          <Chart />
        </div>
        <div className="activity-section">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;