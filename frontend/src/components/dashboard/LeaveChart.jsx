import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState, useEffect } from "react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function LeaveChart() {
  const [legendPosition, setLegendPosition] = useState('right');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setLegendPosition('bottom');
      } else {
        setLegendPosition('right');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const data = {
    labels: ['Annual Leave', 'Sick Leave', 'Casual Leave', 'Work From Home'],
    datasets: [
      {
        data: [45, 20, 15, 20],
        backgroundColor: [
          '#F4C542',
          '#3b82f6',
          '#10b981',
          '#f59e0b',
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: legendPosition,
        labels: {
          color: '#334155',
          font: {
            family: 'Inter',
            size: 13,
            weight: '500',
          },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1e293b',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    cutout: '65%',
  };

  return (
    <div className="chart-wrapper">
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default LeaveChart;
