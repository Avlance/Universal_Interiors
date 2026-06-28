'use client';
import { useEffect, useState } from 'react';

export default function ReviewSlider() {
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setReviewData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center' }}>Loading Google Reviews...</div>;
  if (!reviewData || reviewData.reviews.length === 0) return null;

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#121212', color: '#fff' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ fontSize: '2rem', margin: '0 0 10px 0' }}>What Our Clients Say</h2>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{reviewData.overallRating} ★</span>
          <span style={{ color: '#aaa' }}>({reviewData.totalReviews} Google Reviews)</span>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {reviewData.reviews.map((review, index) => (
          <div key={index} style={{ 
            backgroundColor: '#1e1e1e', 
            padding: '20px', 
            borderRadius: '12px',
            border: '1px solid #333',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <img 
                  src={review.profile_photo_url || `https://ui-avatars.com/api/?name=${review.author_name}&background=random`} 
                  alt={review.author_name} 
                  referrerPolicy="no-referrer"
                  style={{ width: '45px', height: '45px', borderRadius: '50%', marginRight: '12px' }} 
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${review.author_name}&background=random`;
                  }}
                />
                <div>
                  <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{review.author_name}</h4>
                  <small style={{ color: '#888' }}>{review.relative_time_description}</small>
                </div>
              </div>
              <div style={{ color: '#ffcc00', marginBottom: '10px', fontSize: '1.2rem' }}>
                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
              </div>
              <p style={{ fontSize: '0.95rem', color: '#ccc', lineHeight: '1.6', margin: 0 }}>
                "{review.text}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
