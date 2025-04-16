import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface RatingsLineChartProps {
  data: Array<{
    formTitle: string;
    averageRatings: Array<{ date: string; averageRating: number }>;
  }>;
}

const COLORS = [
  '#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#d0ed57', '#888888',
];

export const RatingsLineChart: React.FC<RatingsLineChartProps> = ({ data }) => {
  // Flatten and merge ratings data by date
  const dateMap: Record<string, Record<string, string | number>> = {};

  data.forEach((form) => {
    form.averageRatings.forEach(({ date, averageRating }) => {
      if (!dateMap[date]) {
        dateMap[date] = { date };
      }
      dateMap[date][form.formTitle] = averageRating;
    });
  });

  const flattenedData = Object.values(dateMap);

  const formTitles =
    data.length > 0
      ? data.map((form) => form.formTitle)
      : [];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        📈 Ratings Over Time (per Form)
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart data={flattenedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, 5]} />
          <Tooltip />
          <Legend />
          {formTitles.map((title, index) => (
            <Line
              key={title}
              type="monotone"
              dataKey={title}
              name={title}
              stroke={COLORS[index % COLORS.length]}
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};
