import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const SentimentPieChart = ({ data }) => {
  const chartData = [
  { name: 'Negative', value: data.negative * 100, color: '#ef4444' },
  { name: 'Neutral', value: data.neutral * 100, color: '#fbbf24' },
  { name: 'Positive', value: data.positive * 100, color: '#10b981' },
];

const sentimentOrder = ['negative', 'neutral', 'positive'];
const dominantSentiment = sentimentOrder.reduce((a, b) =>
  data[a] > data[b] ? a : b
);
const dominantPercentage = (data[dominantSentiment] * 100).toFixed(1);

  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className='font-semibold text-xl'>Sentiment Distribution</h3>
      <div className="sentiment-summary">
        <h2
          className={
            dominantSentiment === 'Negative'
              ? 'text-red-500'
              : dominantSentiment === 'Neutral'
              ? 'text-yellow-500'
              : 'text-green-500'
          }
        >
          Overall: {dominantSentiment} ({dominantPercentage}%)
        </h2>
      </div>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SentimentPieChart;
