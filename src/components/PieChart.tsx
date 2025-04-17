import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import chroma from 'chroma-js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { formTitle: string; submissionCount: number }[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  // Generate a visually appealing color palette
  const baseColors = ['#f44336', '#2196f3', '#4caf50', '#ff9800', '#9c27b0'];
  const backgroundColors = data.map((_, index) =>
    chroma(baseColors[index % baseColors.length]).alpha(0.7).hex()
  );
  const borderColors = data.map((_, index) =>
    chroma(baseColors[index % baseColors.length]).darken(0.1).hex()
  );

  const chartData = {
    labels: data.map((item) => item.formTitle),
    datasets: [
      {
        label: 'Submissions',
        data: data.map((item) => item.submissionCount),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right', // Position the legend to the right of the pie chart
        align: 'center',
        labels: {
          color: 'black', // Light text color for better visibility on dark background
          font: {
            size: 14,
          },
          boxWidth: 15,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: 'rgba(30, 41, 59, 0.9)', // Darker tooltip background
        titleColor: '#f0f9ff',
        bodyColor: '#d1d5db',
        borderColor: 'rgba(55, 65, 81, 0.8)',
        borderWidth: 1,
        cornerRadius: 2,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.formattedValue || '';
            const total = context.dataset.data.reduce((a, b) => Number(a) + Number(b), 0);
            const percentage = total ? ((Number(value) / total) * 100).toFixed(1) + '%' : '0%';
            return `${label}: ${value} (${percentage})`;
          },
        },
      },
      title: {
        display: false, // Title is already provided above the chart
      },
    },
    cutout: '0%', // Set to '0%' for a full pie chart, adjust for a donut chart
  };

  return <Pie data={chartData} options={chartOptions} />;
};