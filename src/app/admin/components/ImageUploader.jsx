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

const PdfPreview = styled.div`
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #333;
  font-family: var(--universal-font-medium);
  font-size: 14px;
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
    const isImage = file.type.startsWith('image/');
    const isPdf = file.type === 'application/pdf';

    if (!isImage && !isPdf) {
      if (onUploadError) onUploadError('Please select an image or PDF file');
      return;
    }

    // Create a local preview immediately
    if (isImage) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview({ type: 'image', url: e.target.result });
      reader.readAsDataURL(file);
    } else {
      setPreview({ type: 'pdf', name: file.name });
    }

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
        accept="image/*,application/pdf" 
        style={{ display: 'none' }} 
      />
      
      {preview ? (
        <PreviewContainer>
          {preview.type === 'image' ? (
            <PreviewImage src={preview.url} alt="Preview" />
          ) : (
            <PdfPreview>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D50F25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 8 }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {preview.name}
            </PdfPreview>
          )}
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
          <UploadText>Click or drag file to upload</UploadText>
          <UploadSubText>Supports JPG, PNG, WEBP, PDF (Max 5MB)</UploadSubText>
        </DropZone>
      )}
    </div>
  );
}
