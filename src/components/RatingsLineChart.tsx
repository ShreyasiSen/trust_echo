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
import chroma from 'chroma-js';

interface RatingsLineChartProps {
  data: Array<{
    formTitle: string;
    averageRatings: Array<{ date: string; averageRating: number }>;
  }>;
}

const generateColors = (count: number) => {
  const baseColor = chroma('#64b5f6'); // A nice blue
  return Array.from({ length: count }, (_, i) =>
    baseColor.set('hsl.h', baseColor.get('hsl.h') + i * 30).saturate(0.6).brighten(0.2).hex()
  );
};

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
  const formTitles = data.length > 0 ? data.map((form) => form.formTitle) : [];
  const colors = generateColors(formTitles.length);

  return (
    <div className="bg-[#1e293b] rounded-xl shadow-lg p-6">
      
      <ResponsiveContainer width="100%" height={400}>
        <RechartsLineChart data={flattenedData}>
          <CartesianGrid stroke="#4a5568" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            stroke="#cbd5e0"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 5]}
            stroke="#cbd5e0"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickCount={6}
          />
          <Tooltip
            contentStyle={{ backgroundColor: '#2d3748', color: '#f8f8f2', borderRadius: '8px', padding: '10px' }}
            itemStyle={{ color: '#f8f8f2' }}
          />
          <Legend
            iconSize={14}
            wrapperStyle={{ paddingTop: 20 }}
            formatter={(value, entry) => (
              <span style={{ color: entry.color, fontSize: 12 }}>{value}</span>
            )}
          />
          {formTitles.map((title, index) => (
            <Line
              key={title}
              type="monotone"
              dataKey={title}
              name={title}
              stroke={colors[index % colors.length]}
              strokeWidth={2}
              dot={{ r: 3, fill: colors[index % colors.length] }}
              activeDot={{ r: 6, fill: colors[index % colors.length] }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};