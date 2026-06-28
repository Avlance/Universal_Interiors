'use client';
import { useEffect, useState } from 'react';

export default function ReviewSlider() {
  const [reviewData, setReviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setReviewData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedReview]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center' }}>Loading Google Reviews...</div>;
  if (!reviewData || reviewData.reviews.length === 0) return null;

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#121212', color: '#fff', position: 'relative' }}>
      {/* Vanilla CSS Styles for Animations and Hover Effects */}
      <style>{`
        .review-card {
          transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .review-card:hover {
          transform: translateY(-5px);
          border-color: #ffcc00 !important;
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
        }
        .review-card:hover .read-more-btn {
          color: #fff !important;
          transform: translateX(4px);
        }
        .read-more-btn {
          transition: all 0.3s ease;
        }
        .close-btn {
          transition: all 0.2s ease;
        }
        .close-btn:hover {
          background-color: #ffcc00 !important;
          color: #000 !important;
          transform: scale(1.1) rotate(90deg);
        }
        .modal-overlay {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .modal-content {
          animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .modal-content::-webkit-scrollbar {
          width: 6px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 10px;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 10px;
          transition: background 0.2s ease;
        }
        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #ffcc00;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.95) translateY(10px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>

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
          <div 
            key={index} 
            className="review-card"
            onClick={() => setSelectedReview(review)}
            style={{ 
              backgroundColor: '#1e1e1e', 
              padding: '20px', 
              borderRadius: '12px',
              border: '1px solid #333',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                <img 
                  src={review.profile_photo_url || `https://ui-avatars.com/api/?name=${review.author_name}&background=random`} 
                  alt={review.author_name} 
                  referrerPolicy="no-referrer"
                  style={{ width: '45px', height: '45px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover' }} 
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
              <p style={{ 
                fontSize: '0.95rem', 
                color: '#ccc', 
                lineHeight: '1.6', 
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                "{review.text}"
              </p>
            </div>
            
            <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'flex-end' }}>
              <span 
                className="read-more-btn"
                style={{ 
                  fontSize: '0.8rem', 
                  color: '#ffcc00', 
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                Read Full Review <span>→</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup Overlay */}
      {selectedReview && (
        <div 
          className="modal-overlay"
          onClick={() => setSelectedReview(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10000,
            padding: '20px',
            boxSizing: 'border-box'
          }}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: '#1a1a1a',
              color: '#fff',
              borderRadius: '16px',
              border: '1px solid #333',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
              width: '100%',
              maxWidth: '550px',
              padding: '30px',
              position: 'relative',
              boxSizing: 'border-box',
              maxHeight: '85vh',
              overflowY: 'auto'
            }}
          >
            {/* Close Button */}
            <button 
              className="close-btn"
              onClick={() => setSelectedReview(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: '#2a2a2a',
                border: 'none',
                color: '#fff',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                lineHeight: 1,
              }}
            >
              &times;
            </button>

            {/* Author Info */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', paddingRight: '20px' }}>
              <img 
                src={selectedReview.profile_photo_url || `https://ui-avatars.com/api/?name=${selectedReview.author_name}&background=random`} 
                alt={selectedReview.author_name} 
                referrerPolicy="no-referrer"
                style={{ width: '60px', height: '60px', borderRadius: '50%', marginRight: '16px', border: '2px solid #333', objectFit: 'cover' }} 
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=${selectedReview.author_name}&background=random`;
                }}
              />
              <div>
                <h3 style={{ margin: '0 0 4px 0', fontSize: '1.25rem', fontWeight: 'bold' }}>{selectedReview.author_name}</h3>
                <small style={{ color: '#aaa', fontSize: '0.85rem' }}>{selectedReview.relative_time_description}</small>
              </div>
            </div>

            {/* Stars */}
            <div style={{ color: '#ffcc00', marginBottom: '15px', fontSize: '1.4rem' }}>
              {'★'.repeat(selectedReview.rating)}{'☆'.repeat(5 - selectedReview.rating)}
            </div>

            {/* Full Review Text */}
            <p style={{ 
              fontSize: '1rem', 
              color: '#ddd', 
              lineHeight: '1.7', 
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word'
            }}>
              "{selectedReview.text}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
