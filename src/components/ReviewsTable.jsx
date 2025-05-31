import { useState } from 'react';

const ReviewsTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredData = data.filter(item => {
    const matchesSearch = item.Review.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.Title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         item.predicted_sentiment.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="bg-white rounded shadow p-6">
      <div className="table-controls">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Sentiments</option>
          <option value="positive">Positive Only</option>
          <option value="negative">Negative Only</option>
        </select>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Location</th>
              <th>Sentiment</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className={item.predicted_sentiment.toLowerCase()}>
                <td>{item.Title}</td>
                <td>
                  <span className={`rating rating-${item.Rating}`}>
                    {item.Rating}
                  </span>
                </td>
                <td className="review-text">{item.Review}</td>
                <td>{item['Customer Name']}</td>
                <td>{item.Date}</td>
                <td>{item['Customer Location']}</td>
                <td>
                  <span className={`sentiment-badge ${item.predicted_sentiment.toLowerCase()}`}>
                    {item.predicted_sentiment}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReviewsTable;