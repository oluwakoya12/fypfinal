import { FaUpload, FaCheckCircle } from 'react-icons/fa';

const FileUpload = ({ setAnalysisData, setIsLoading }) => {
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://fyp-3jps.onrender.com/api/v1/analyze', {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
          Accept: 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisData(data);
      console.log(data)
    } catch (error) {
      console.error('Error:', error);
      alert('Error analyzing file. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-700">Review Sentiment Analyzer</h2>
        <p className="text-gray-600 mt-1">Gain insights from customer feedback</p>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg mt-6 p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-purple-100 p-4 rounded-full mb-4">
          <FaUpload className="text-purple-600 text-3xl" />
        </div>
        <p className="font-semibold text-gray-700 mb-2">Upload customer reviews</p>
        <p className="text-sm text-gray-500 mb-4">Drag & drop your CSV file here or click to browse</p>

        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaUpload />
            Select File
          </div>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            hidden
          />
        </label>
      </div>

      <div className="bg-gray-50 border mt-6 rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-2 text-gray-700">File Requirements</h3>
        <p className="text-sm text-gray-600 mb-3">Your CSV must include these columns:</p>
        <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
          {[
            'Title',
            'Review',
            'Date',
            'Rating',
            'Customer Name',
            'Customer Location',
          ].map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs text-center text-gray-400 mt-4">
        🔒 Your data is processed securely
      </p>
    </div>
  );
};

export default FileUpload;
