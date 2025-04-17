import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface BarGraphProps {
  data: { formTitle: string; averageRating: number }[];
}

export const BarGraph: React.FC<BarGraphProps> = ({ data }) => {
  // Define a set of distinct colors
  const colors = [
    'rgba(255, 99, 132, 0.6)',   // red
    'rgba(54, 162, 235, 0.6)',   // blue
    'rgba(255, 206, 86, 0.6)',   // yellow
    'rgba(75, 192, 192, 0.6)',   // teal
    'rgba(153, 102, 255, 0.6)',  // purple
    'rgba(255, 159, 64, 0.6)',   // orange
    'rgba(0, 200, 83, 0.6)',     // green
  ];

  const borderColors = colors.map(color => color.replace('0.6', '1')); // full opacity for borders

  const chartData = {
    labels: data.map((item) => item.formTitle),
    datasets: [
      {
        label: '',
        data: data.map((item) => item.averageRating),
        backgroundColor: colors.slice(0, data.length),
        borderColor: borderColors.slice(0, data.length),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Forms',
          color: 'blue',
          font: {
            size: 14,
          },
        },
        ticks: {
          color: 'black',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Average Rating',
          color: 'blue',
          font: {
            size: 14,
          },
        },
        ticks: {
          color: 'black',
          stepSize: 0.5,
          callback: function (value: string | number) {
            if (typeof value === 'number') {
              return value.toFixed(1);
            }
            return value;
          },
        },
        beginAtZero: true,
      },
    },
  };


  return <Bar data={chartData} options={options} />;
};
