'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const DropZone = styled.div`
  border: 2px dashed ${props => props.$isDragging ? '#D50F25' : '#ccc'};
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  background: ${props => props.$isDragging ? '#fff5f5' : '#fcfcfc'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #D50F25;
    background: #fff5f5;
  }
`;

const UploadText = styled.div`
  font-family: var(--universal-font-medium);
  color: #444;
  margin-top: 12px;
`;

const UploadSubText = styled.div`
  font-family: var(--universal-font);
  color: #888;
  font-size: 13px;
  margin-top: 4px;
`;

const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(0,0,0,0.5);
  color: white;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background: rgba(213, 15, 37, 0.9);
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #eee;
  border-radius: 4px;
  margin-top: 16px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: #D50F25;
  width: ${props => props.$progress}%;
  transition: width 0.2s ease-out;
`;

export default function ImageUploader({ onUploadSuccess, onUploadError }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(null);
  
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      if (onUploadError) onUploadError('Please select an image file');
      return;
    }

    // Create a local preview immediately
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);

    setIsUploading(true);
    setProgress(20);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Use XMLHttpRequest to track upload progress if needed, 
      // but fetch is simpler. We'll simulate progress for UI responsiveness.
      const progressInterval = setInterval(() => {
        setProgress(p => Math.min(p + 10, 90));
      }, 500);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (res.ok) {
        const data = await res.json();
        // Return the secure Cloudinary URL
        if (onUploadSuccess) onUploadSuccess(data.data.url);
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error(err);
      if (onUploadError) onUploadError('Failed to upload image. Please try again.');
      setPreview(null);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 500);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    if (onUploadSuccess) onUploadSuccess(null); // Clear URL from parent
  };

  return (
    <div>
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleChange} 
        accept="image/*" 
        style={{ display: 'none' }} 
      />
      
      {preview ? (
        <PreviewContainer>
          <PreviewImage src={preview} alt="Preview" />
          {!isUploading && (
            <RemoveButton onClick={handleRemove}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </RemoveButton>
          )}
          {isUploading && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, background: 'rgba(255,255,255,0.9)' }}>
              <div style={{ fontSize: 13, fontFamily: 'var(--universal-font-medium)', marginBottom: 8, color: '#111' }}>Uploading to Cloudinary...</div>
              <ProgressBar><ProgressFill $progress={progress} /></ProgressBar>
            </div>
          )}
        </PreviewContainer>
      ) : (
        <DropZone 
          $isDragging={isDragging}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D50F25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <UploadText>Click or drag image to upload</UploadText>
          <UploadSubText>Supports JPG, PNG, WEBP (Max 5MB)</UploadSubText>
        </DropZone>
      )}
    </div>
  );
}
