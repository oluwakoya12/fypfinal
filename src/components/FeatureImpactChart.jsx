import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FeatureImpactChart = ({ data }) => {
  // Sort by absolute coefficient value for better visualization
  const sortedData = [...data].sort((a, b) => Math.abs(b.Coefficient) - Math.abs(a.Coefficient));

  return (
    <div className="feature-chart">
      <h3>Feature Impact on Sentiment</h3>
      <p className="subtitle">Positive values improve sentiment, negative values hurt sentiment</p>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="Feature" type="category" width={100} />
            <Tooltip 
              formatter={(value, name) => [
                value.toFixed(3),
                name === 'Coefficient' ? 'Impact Strength' : 'Explanatory Power'
              ]}
              labelFormatter={(label) => `Feature: ${label}`}
            />
            <Bar 
              dataKey="Coefficient" 
              fill="#8884d8" 
              name="Impact Coefficient"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeatureImpactChart;