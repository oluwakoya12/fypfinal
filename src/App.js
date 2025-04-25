import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import './index.css'

function App() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <div className="app">
      <Dashboard analysisData={analysisData} setAnalysisData={setAnalysisData} />
    </div>
  );
}

export default App;