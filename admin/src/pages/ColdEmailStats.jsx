import React from 'react';
import { Mail, Percent, MousePointerClick, Reply, TrendingUp } from 'lucide-react';

const emailStats = [
  { label: 'Emails Sent', value: '3,200', icon: Mail },
  { label: 'Open Rate', value: '52%', icon: Percent },
  { label: 'Click Rate', value: '12%', icon: MousePointerClick },
  { label: 'Replies', value: '170', icon: Reply },
  { label: 'Conversions', value: '25', icon: TrendingUp },
];

const teamStats = [
  { name: 'John Doe', sent: 1200, opens: '65%', replies: 45, conversions: 10 },
  { name: 'Priya Sharma', sent: 1000, opens: '58%', replies: 32, conversions: 7 },
];

const followUps = [
  { email: 'ceo@startup.com', daysSince: 3, followUp: 1, action: 'Send today' },
  { email: 'client@designhub.com', daysSince: 7, followUp: 2, action: 'Final reminder' },
];

const ColdEmailStats = () => {
  return (
    <div className="cold-email-container">
      <h2>📧 Cold Email Performance</h2>

      <div className="stats-grid">
        {emailStats.map((stat, index) => (
          <div key={index} className="stat-card">
            <stat.icon size={28} />
            <div>
              <p className="label">{stat.label}</p>
              <p className="value">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>👥 Team Performance</h3>
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Sent</th>
              <th>Open Rate</th>
              <th>Replies</th>
              <th>Conversions</th>
            </tr>
          </thead>
          <tbody>
            {teamStats.map((member, i) => (
              <tr key={i}>
                <td>{member.name}</td>
                <td>{member.sent}</td>
                <td>{member.opens}</td>
                <td>{member.replies}</td>
                <td>{member.conversions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>📅 Follow-Up Manager</h3>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Days Since Contact</th>
              <th>Follow-Up #</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {followUps.map((item, i) => (
              <tr key={i}>
                <td>{item.email}</td>
                <td>{item.daysSince}</td>
                <td>{item.followUp}</td>
                <td>{item.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inline CSS */}
      <style>{`
        .cold-email-container {
          font-family: Arial, sans-serif;
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          max-width: 900px;
          margin: 0 auto;
        }

        h2 {
          font-size: 24px;
          margin-bottom: 20px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
          margin-bottom: 30px;
        }

        .stat-card {
          display: flex;
          align-items: center;
          gap: 12px;
          background: #f9f9f9;
          padding: 12px 16px;
          border-radius: 6px;
          border: 1px solid #eee;
        }

        .stat-card .label {
          font-size: 14px;
          color: #666;
        }

        .stat-card .value {
          font-size: 18px;
          font-weight: bold;
        }

        .section {
          margin-top: 30px;
        }

        h3 {
          margin-bottom: 10px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        table th, table td {
          padding: 10px;
          border: 1px solid #ddd;
          text-align: left;
        }

        table th {
          background: #f0f0f0;
        }
      `}</style>
    </div>
  );
};

export default ColdEmailStats;
