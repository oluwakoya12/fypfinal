const FileUpload = ({ setAnalysisData, setIsLoading }) => {
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
      
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          const response = await fetch('http://localhost:8000/api/v1/analyze', {
            method: 'POST',
            body: formData,
            mode: 'cors',
            headers: {
              'Accept': 'application/json',
            },
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setAnalysisData(data);
        } catch (error) {
          console.error('Error:', error);
          alert('Error analyzing file. Please check the console for details.');
        } finally {
          setIsLoading(false);
        }
      };
  
    return (
      <div className="upload-container">
        <div className="upload-card">
          <h2>Upload Customer Reviews</h2>
          <p>Analyze sentiment and feature impacts from your product reviews</p>
          
          <label htmlFor="file-upload" className="upload-btn">
            Choose CSV File
            <input 
              id="file-upload" 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload}
              hidden
            />
          </label>
          
          <div className="requirements">
            <p>File must include these columns:</p>
            <ul>
              <li>Title</li>
              <li>Rating</li>
              <li>Review</li>
              <li>Customer Name</li>
              <li>Date</li>
              <li>Customer Location</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default FileUpload;