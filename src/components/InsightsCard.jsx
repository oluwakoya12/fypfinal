const InsightsCard = ({ sentimentData, featureData }) => {
    // Get top positive and negative features
    const positiveFeatures = [...featureData]
      .filter(f => f.Coefficient > 0)
      .sort((a, b) => b.Coefficient - a.Coefficient)
      .slice(0, 2);
    
    const negativeFeatures = [...featureData]
      .filter(f => f.Coefficient < 0)
      .sort((a, b) => a.Coefficient - b.Coefficient)
      .slice(0, 2);
  
    const overallSentiment = sentimentData.Negative > sentimentData.Positive 
      ? 'negative' 
      : 'positive';
  
    return (
      <div className="insights-card">
        <h3>Key Insights</h3>
        
        <div className={`sentiment-banner ${overallSentiment}`}>
          {overallSentiment === 'negative' ? (
            <p>⚠️ Customers are generally dissatisfied ({Math.round(sentimentData.Negative * 100)}% negative sentiment)</p>
          ) : (
            <p>✅ Customers are generally satisfied ({Math.round(sentimentData.Positive * 100)}% positive sentiment)</p>
          )}
        </div>
  
        <div className="insights-section">
          <h4>What's Working Well:</h4>
          <ul>
            {positiveFeatures.map(feature => (
              <li key={feature.Feature}>
                <strong>{feature.Feature}</strong>: Customers appreciate this aspect 
                (Impact score: {feature.Coefficient.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
  
        <div className="insights-section">
          <h4>Areas Needing Improvement:</h4>
          <ul>
            {negativeFeatures.map(feature => (
              <li key={feature.Feature}>
                <strong>{feature.Feature}</strong>: This is causing dissatisfaction 
                (Impact score: {feature.Coefficient.toFixed(2)})
              </li>
            ))}
          </ul>
        </div>
  
        <div className="recommendations">
          <h4>Recommendations:</h4>
          {negativeFeatures.some(f => f.Feature === 'battery') && (
            <p>🔋 Battery life is a major concern - consider improvements in power efficiency</p>
          )}
          {negativeFeatures.some(f => f.Feature === 'performance') && (
            <p>⚡ Performance issues are affecting sentiment - optimize system resources</p>
          )}
          {positiveFeatures.some(f => f.Feature === 'camera') && (
            <p>📸 Camera quality is a strength - highlight this in marketing materials</p>
          )}
        </div>
      </div>
    );
  };
  
  export default InsightsCard;