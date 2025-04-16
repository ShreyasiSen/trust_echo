import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  data: { formTitle: string; submissionCount: number }[];
}

export const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.formTitle),
    datasets: [
      {
        label: 'Submissions',
        data: data.map((item) => item.submissionCount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={chartData} />;
};