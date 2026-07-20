import { FiTrendingUp } from "react-icons/fi";

function StatsCard({ title, value, growth, icon: Icon, color }) {
  const colorMap = {
    primary: '#F4C542',
    success: '#10b981',
    info: '#3b82f6',
    warning: '#f59e0b',
  };

  const bgColor = colorMap[color] || colorMap.primary;

  return (
    <div className="stats-card">
      <div className="stats-card-icon-wrapper" style={{ backgroundColor: `${bgColor}15` }}>
        <Icon className="stats-card-icon" style={{ color: bgColor }} size={24} />
      </div>
      <div className="stats-card-content">
        <h3 className="stats-card-title">{title}</h3>
        <p className="stats-card-value">{value}</p>
        <div className="stats-card-growth">
          <FiTrendingUp size={14} />
          <span>{growth}</span>
        </div>
      </div>
    </div>
  );
}

export default StatsCard;
