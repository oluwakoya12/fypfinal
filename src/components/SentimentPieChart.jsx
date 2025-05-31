import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const SentimentPieChart = ({ data }) => {
  const chartData = [
    { name: 'Negative', value: data.Negative * 100, color: '#ef4444' },
    { name: 'Positive', value: data.Positive * 100, color: '#10b981' },
  ];

  const dominantSentiment = data.Negative > data.Positive ? 'Negative' : 'Positive';
  const dominantPercentage = (dominantSentiment === 'Negative' 
    ? data.Negative * 100 
    : data.Positive * 100
  ).toFixed(1);

  return (
    <div className="bg-white rounded shadow p-6">
      <h3 className='font-semibold text-xl'>Sentiment Distribution</h3>
      <div className="sentiment-summary">
        <h2 
          className={dominantSentiment === 'Negative' ? 'negative' : 'positive'}
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