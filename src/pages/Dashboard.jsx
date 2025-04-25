import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import SentimentPieChart from '../components/SentimentPieChart';
import FeatureImpactChart from '../components/FeatureImpactChart';
import ReviewsTable from '../components/ReviewsTable';
import InsightsCard from '../components/InsightsCard';


const Dashboard = ({ analysisData, setAnalysisData }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="dashboard-container">
      {!analysisData ? (
        <FileUpload 
          setAnalysisData={setAnalysisData} 
          setIsLoading={setIsLoading} 
        />
      ) : (
        <div className="analysis-results">
          <div className="header-section">
            <h1>Sentiment Analysis Dashboard</h1>
            <button 
              className="reset-btn"
              onClick={() => setAnalysisData(null)}
            >
              Analyze New File
            </button>
          </div>

          <div className="grid-layout">
            <div className="sentiment-card">
              <SentimentPieChart data={analysisData.sentiment_distribution} />
            </div>
            
            <div className="insights-card">
              <InsightsCard 
                sentimentData={analysisData.sentiment_distribution}
                featureData={analysisData.feature_impacts}
              />
            </div>

            <div className="features-card">
              <FeatureImpactChart data={analysisData.feature_impacts} />
            </div>

            <div className="table-card">
              <ReviewsTable data={analysisData.raw_data} />
            </div>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p>Analyzing your reviews...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;