// src/pages/Insights/Insights.js
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Insights.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Insights() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const mockData = [
      { date: 'Mon', mood: 4 },
      { date: 'Tue', mood: 3 },
      { date: 'Wed', mood: 2 },
      { date: 'Thu', mood: 5 },
      { date: 'Fri', mood: 4 },
      { date: 'Sat', mood: 5 },
      { date: 'Sun', mood: 3 },
    ];
    setMoodData(mockData);
  }, []);

  const data = {
    labels: moodData.map(item => item.date),
    datasets: [
      {
        label: 'Mood Level',
        data: moodData.map(item => item.mood),
        borderColor: '#84361C',
        backgroundColor: '#F6B092',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="insights-page">
      <h1>Your Insights</h1>
      
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card-1">
          <h3>Current Streak</h3>
          <p>7 days</p>
        </div>
        <div className="stat-card stat-card-2">
          <h3>Most Common Mood</h3>
          <p>Happy</p>
        </div>
        <div className="stat-card stat-card-3">
          <h3>Journal Entries</h3>
          <p>24</p>
        </div>
      </div>
    </div>
  );
}