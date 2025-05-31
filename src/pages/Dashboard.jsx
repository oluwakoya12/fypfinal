import { useState } from 'react';
import FileUpload from '../components/FileUpload';
import SentimentPieChart from '../components/SentimentPieChart';
import FeatureImpactChart from '../components/FeatureImpactChart';
import ReviewsTable from '../components/ReviewsTable';
import InsightsCard from '../components/InsightsCard';

const Dashboard = ({ analysisData, setAnalysisData }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-8">
      {!analysisData ? (
        <FileUpload 
          setAnalysisData={setAnalysisData} 
          setIsLoading={setIsLoading} 
        />
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className='text-3xl font-bold text-gray-800'>Sentiment Analysis Dashboard</h1>
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              onClick={() => setAnalysisData(null)}
            >
              Analyze New File
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded shadow col-span-1">
              <SentimentPieChart data={analysisData.sentiment_distribution} />
            </div>
            <div className="bg-white p-6 rounded shadow col-span-2">
              <InsightsCard 
                sentimentData={analysisData.sentiment_distribution}
                featureData={analysisData.feature_impacts}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <FeatureImpactChart data={analysisData.feature_impacts} />
          </div>

          <div className="bg-white p-6 rounded shadow">
            <ReviewsTable data={analysisData.raw_data} />
          </div>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="spinner mb-4"></div>
            <p className="text-lg font-medium">Analyzing your reviews...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
