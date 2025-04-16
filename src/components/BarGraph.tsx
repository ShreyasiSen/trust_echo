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
  const chartData = {
    labels: data.map((item) => item.formTitle),
    datasets: [
      {
        label: 'Average Rating',
        data: data.map((item) => item.averageRating),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={chartData} />;
};