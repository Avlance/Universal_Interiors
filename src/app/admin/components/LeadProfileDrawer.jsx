'use client';

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import ImageUploader from './ImageUploader';

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  z-index: 1000;
  transition: opacity 0.3s;
`;

const DrawerContainer = styled.div`
  position: fixed;
  top: 0; right: 0; bottom: 0;
  width: 500px;
  background: #fff;
  z-index: 1001;
  box-shadow: -4px 0 20px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  animation: ${props => props.$isClosing ? slideOut : slideIn} 0.3s ease-in-out forwards;
  
  @media (max-width: 600px) {
    width: 100%;
  }
`;

const DrawerHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  font-family: var(--universal-font-bold);
  margin: 0;
  color: #111;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  &:hover { color: #000; }
`;

const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  padding: 0 24px;
`;

const Tab = styled.button`
  background: none;
  border: none;
  padding: 16px 0;
  margin-right: 24px;
  font-family: var(--universal-font-medium);
  font-size: 15px;
  color: ${props => props.$active ? '#D50F25' : '#666'};
  border-bottom: 2px solid ${props => props.$active ? '#D50F25' : 'transparent'};
  cursor: pointer;
  
  &:hover { color: #D50F25; }
`;

const ContentArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 24px;
`;

const InfoRow = styled.div`
  display: flex;
  margin-bottom: 16px;
  font-family: var(--universal-font);
`;

const Label = styled.div`
  width: 120px;
  color: #666;
  font-weight: 600;
`;

const Value = styled.div`
  color: #111;
  flex: 1;
`;

const NotesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const NoteCard = styled.div`
  background: #fcfcfc;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 16px;
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #888;
  margin-bottom: 8px;
`;

const NoteText = styled.div`
  color: #333;
  line-height: 1.5;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: var(--universal-font);
  min-height: 100px;
  resize: vertical;
  margin-bottom: 12px;
`;

const Button = styled.button`
  background: #D50F25;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 24px;
  font-family: var(--universal-font-medium);
  cursor: pointer;
  
  &:disabled { background: #ccc; cursor: not-allowed; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 24px;
`;

const FileCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const FileImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
`;

const FileInfo = styled.div`
  padding: 12px;
  font-size: 13px;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DeleteBtn = styled.button`
  background: #fff;
  border: 1px solid #fee;
  color: #D50F25;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 12px;
  &:hover { background: #fee; }
`;

export default function LeadProfileDrawer({ isOpen, onClose, leadId, source }) {
  const [isClosing, setIsClosing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Note state
  const [newNote, setNewNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen && leadId) {
      fetchLead();
    }
  }, [isOpen, leadId]);

  const fetchLead = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}?source=${source}`);
      if (res.ok) {
        const data = await res.json();
        setLead(data.lead);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // match animation duration
  };

  if (!isOpen) return null;

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/admin/leads/${leadId}?source=${source}&action=note`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newNote, author: 'Admin' })
      });
      if (res.ok) {
        setNewNote('');
        fetchLead();
      }
    } catch (err) {
      alert('Failed to add note');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUploadFile = async (url, type) => {
    try {
      const fileName = url.split('/').pop();
      const res = await fetch(`/api/admin/leads/${leadId}?source=${source}&action=${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, name: fileName })
      });
      if (res.ok) {
        fetchLead();
      }
    } catch (err) {
      alert('Failed to save file');
    }
  };

  const handleDeleteFile = async (itemId, type) => {
    if (!confirm('Are you sure you want to delete this file?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${leadId}?source=${source}&action=${type}&itemId=${itemId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchLead();
      }
    } catch (err) {
      alert('Failed to delete file');
    }
  };

  const handleDeleteNote = async (itemId) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    try {
      const res = await fetch(`/api/admin/leads/${leadId}?source=${source}&action=note&itemId=${itemId}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchLead();
      }
    } catch (err) {
      alert('Failed to delete note');
    }
  };

  return (
    <>
      <DrawerOverlay onClick={handleClose} style={{ opacity: isClosing ? 0 : 1 }} />
      <DrawerContainer $isClosing={isClosing}>
        <DrawerHeader>
          <Title>{lead?.name || 'Loading...'}</Title>
          <CloseButton onClick={handleClose}>&times;</CloseButton>
        </DrawerHeader>

        <Tabs>
          <Tab $active={activeTab === 'overview'} onClick={() => setActiveTab('overview')}>Overview & Notes</Tab>
          <Tab $active={activeTab === 'documents'} onClick={() => setActiveTab('documents')}>Documents</Tab>
          <Tab $active={activeTab === 'photos'} onClick={() => setActiveTab('photos')}>Site Photos</Tab>
        </Tabs>

        <ContentArea>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#666', marginTop: 40 }}>Loading profile...</div>
          ) : !lead ? (
            <div style={{ textAlign: 'center', color: '#D50F25', marginTop: 40 }}>Failed to load lead details.</div>
          ) : (
            <>
              {activeTab === 'overview' && (
                <div>
                  <h3 style={{ marginBottom: 16 }}>Contact Info</h3>
                  <InfoRow><Label>Phone:</Label><Value>{lead.phone}</Value></InfoRow>
                  {lead.email && <InfoRow><Label>Email:</Label><Value>{lead.email}</Value></InfoRow>}
                  {lead.city && <InfoRow><Label>City:</Label><Value>{lead.city}</Value></InfoRow>}
                  {lead.propertyType && <InfoRow><Label>Property:</Label><Value>{lead.propertyType}</Value></InfoRow>}
                  <InfoRow><Label>Source:</Label><Value>{lead.source}</Value></InfoRow>
                  <InfoRow><Label>Status:</Label><Value>{lead.status || 'New'}</Value></InfoRow>
                  
                  <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '24px 0' }} />
                  
                  <h3 style={{ marginBottom: 16 }}>Activity & Notes</h3>
                  <TextArea 
                    placeholder="Add a new note..."
                    value={newNote}
                    onChange={e => setNewNote(e.target.value)}
                  />
                  <div style={{ textAlign: 'right' }}>
                    <Button onClick={handleAddNote} disabled={isSubmitting || !newNote.trim()}>
                      {isSubmitting ? 'Saving...' : 'Add Note'}
                    </Button>
                  </div>

                  <NotesList>
                    {(lead.notes || []).slice().reverse().map((note) => (
                      <NoteCard key={note.id}>
                        <NoteHeader>
                          <span>{note.author}</span>
                          <span>
                            {new Date(note.createdAt).toLocaleDateString()} 
                            <DeleteBtn style={{ marginLeft: 8 }} onClick={() => handleDeleteNote(note.id)}>Delete</DeleteBtn>
                          </span>
                        </NoteHeader>
                        <NoteText>{note.text}</NoteText>
                      </NoteCard>
                    ))}
                    {(!lead.notes || lead.notes.length === 0) && (
                      <div style={{ color: '#888', textAlign: 'center', padding: 20 }}>No notes yet.</div>
                    )}
                  </NotesList>
                </div>
              )}

              {activeTab === 'documents' && (
                <div>
                  <h3 style={{ marginBottom: 16 }}>Upload Financials / PDFs</h3>
                  <ImageUploader 
                    onUploadSuccess={(url) => url && handleUploadFile(url, 'document')}
                    onUploadError={(err) => alert(err)}
                  />
                  
                  <Grid>
                    {(lead.documents || []).map(doc => (
                      <FileCard key={doc.id}>
                        {doc.url.toLowerCase().endsWith('.pdf') ? (
                          <div style={{ height: 120, background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            PDF Document
                          </div>
                        ) : (
                          <FileImage src={doc.url} />
                        )}
                        <FileInfo>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', maxWidth: '70%', overflow: 'hidden' }}>
                            <a href={doc.url} target="_blank" rel="noreferrer" style={{ color: '#5485EE', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              View
                            </a>
                            {doc.quotationData && (
                              <a href={`/admin/quotations/create?leadId=${leadId}&docId=${doc.id}`} style={{ color: '#F5B400', textDecoration: 'none', fontSize: '12px', fontWeight: 700, borderLeft: '1px solid #ddd', paddingLeft: '8px' }}>
                                Edit Quote
                              </a>
                            )}
                          </div>
                          <DeleteBtn onClick={() => handleDeleteFile(doc.id, 'document')}>Del</DeleteBtn>
                        </FileInfo>
                      </FileCard>
                    ))}
                  </Grid>
                </div>
              )}

              {activeTab === 'photos' && (
                <div>
                  <h3 style={{ marginBottom: 16 }}>Upload Site / Reference Photos</h3>
                  <ImageUploader 
                    onUploadSuccess={(url) => url && handleUploadFile(url, 'sitePhoto')}
                    onUploadError={(err) => alert(err)}
                  />
                  
                  <Grid>
                    {(lead.sitePhotos || []).map(photo => (
                      <FileCard key={photo.id}>
                        <FileImage src={photo.url} />
                        <FileInfo>
                          <a href={photo.url} target="_blank" rel="noreferrer" style={{ color: '#5485EE', textDecoration: 'none' }}>View</a>
                          <DeleteBtn onClick={() => handleDeleteFile(photo.id, 'sitePhoto')}>Del</DeleteBtn>
                        </FileInfo>
                      </FileCard>
                    ))}
                  </Grid>
                </div>
              )}
            </>
          )}
        </ContentArea>
      </DrawerContainer>
    </>
  );
}
