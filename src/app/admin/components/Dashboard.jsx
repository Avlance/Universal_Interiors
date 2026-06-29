'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@/components/button/js/Button';

// Styled Components
const DashboardContainer = styled.div`
  padding: 32px;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

const Title = styled.h1`
  font-family: var(--universal-font-bold);
  font-size: 28px;
  color: #111;
`;

const MetricsRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 32px;
  flex-wrap: wrap;
`;

const MetricCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  flex: 1;
  min-width: 200px;
`;

const MetricTitle = styled.div`
  font-family: var(--universal-font-medium);
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

const MetricValue = styled.div`
  font-family: var(--universal-font-bold);
  font-size: 32px;
  color: #111;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
  overflow: hidden;
  overflow-x: auto;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 8px;
`;

const Tab = styled.button`
  font-family: var(--universal-font-medium);
  font-size: 15px;
  color: ${props => props.$active ? '#D50F25' : '#666'};
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;

  &:hover {
    color: #D50F25;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -9px;
    left: 0;
    right: 0;
    height: 2px;
    background: #D50F25;
    transform: scaleX(${props => props.$active ? 1 : 0});
    transition: transform 0.2s;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  text-align: left;
  padding: 16px;
  background: #f8f9fa;
  font-family: var(--universal-font-semibold);
  font-size: 13px;
  color: #444;
  border-bottom: 1px solid #eaeaea;
`;

const Td = styled.td`
  padding: 16px;
  font-family: var(--universal-font);
  font-size: 14px;
  color: #111;
  border-bottom: 1px solid #eaeaea;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  font-family: var(--universal-font-medium);
  font-size: 13px;
  outline: none;
  background: ${props => {
    switch(props.value) {
      case 'New': return '#e6f0ff';
      case 'Contacted': return '#fff3e6';
      case 'Turned as customer': return '#e6ffe6';
      case 'Need to call again': return '#ffe6e6';
      default: return 'white';
    }
  }};
  color: ${props => {
    switch(props.value) {
      case 'New': return '#0055cc';
      case 'Contacted': return '#cc7700';
      case 'Turned as customer': return '#008000';
      case 'Need to call again': return '#cc0000';
      default: return '#111';
    }
  }};
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: var(--universal-font);
  font-size: 14px;
  margin-top: 16px;
  margin-bottom: 24px;
  outline: none;
  resize: vertical;
  
  &:focus {
    border-color: #D50F25;
  }
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 12px;
  margin-bottom: 16px;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--universal-font-medium);
  font-size: 14px;
  cursor: pointer;
`;

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhones, setSelectedPhones] = useState(new Set());
  const [activeTab, setActiveTab] = useState('All');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [messageChannel, setMessageChannel] = useState('whatsapp');
  const [isSending, setIsSending] = useState(false);
  const [targetPhones, setTargetPhones] = useState([]); // Array of phones

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/admin/leads');
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
      }
    } catch (err) {
      console.error('Failed to fetch leads', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.reload();
  };

  const handleStatusChange = async (leadId, source, newStatus) => {
    const previousLeads = [...leads];
    // Optimistic update
    setLeads(leads.map(l => l._id === leadId ? { ...l, status: newStatus } : l));

    try {
      const res = await fetch('/api/admin/leads', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: leadId, source, status: newStatus })
      });
      if (!res.ok) throw new Error('Failed to update');
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
      setLeads(previousLeads); // Rollback
    }
  };

  const handleDeleteLead = async (leadId, source) => {
    if (!confirm('Are you sure you want to delete this lead? This cannot be undone.')) return;
    
    try {
      const res = await fetch(`/api/admin/leads?id=${leadId}&source=${source}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setLeads(leads.filter(l => l._id !== leadId));
        // Remove from selected if it was selected
        const newSet = new Set(selectedPhones);
        const lead = leads.find(l => l._id === leadId);
        if (lead && newSet.has(lead.phone)) {
          newSet.delete(lead.phone);
          setSelectedPhones(newSet);
        }
      } else {
        alert('Failed to delete lead');
      }
    } catch (err) {
      console.error(err);
      alert('Error deleting lead');
    }
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedPhones(new Set(leads.map(l => l.phone)));
    } else {
      setSelectedPhones(new Set());
    }
  };

  const toggleSelect = (phone) => {
    const newSet = new Set(selectedPhones);
    if (newSet.has(phone)) newSet.delete(phone);
    else newSet.add(phone);
    setSelectedPhones(newSet);
  };

  const openMessageModal = (phones) => {
    if (phones.length === 0) return;
    setTargetPhones(phones);
    setMessageText('');
    setIsModalOpen(true);
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return alert("Message cannot be empty");
    
    setIsSending(true);
    try {
      const res = await fetch('/api/admin/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phones: targetPhones,
          message: messageText,
          channel: messageChannel
        })
      });
      
      const data = await res.json();
      if (res.ok) {
        alert(`Successfully sent to ${data.results?.successful || 0} recipients.`);
        setIsModalOpen(false);
        setSelectedPhones(new Set());
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while sending messages.");
    } finally {
      setIsSending(false);
    }
  };

  // Metrics
  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'New').length;
  const contactedLeads = leads.filter(l => l.status === 'Contacted').length;
  const needToCallLeads = leads.filter(l => l.status === 'Need to call again').length;
  const customers = leads.filter(l => l.status === 'Turned as customer').length;

  // Filtering leads based on active tab
  const filteredLeads = leads.filter(l => {
    if (activeTab === 'All') return true;
    if (activeTab === 'New') return l.status === 'New';
    if (activeTab === 'Contacted') return l.status === 'Contacted';
    if (activeTab === 'Need to call again') return l.status === 'Need to call again';
    if (activeTab === 'Turned as customer') return l.status === 'Turned as customer';
    return true;
  });

  if (loading) {
    return <DashboardContainer>Loading dashboard...</DashboardContainer>;
  }

  return (
    <DashboardContainer>
      <Header>
        <Title>Leads Management</Title>
        <Button secondary onClick={handleLogout}>Logout</Button>
      </Header>

      <MetricsRow>
        <MetricCard>
          <MetricTitle>Total Requests</MetricTitle>
          <MetricValue>{totalLeads}</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricTitle>New</MetricTitle>
          <MetricValue style={{ color: '#0055cc' }}>{newLeads}</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricTitle>Contacted</MetricTitle>
          <MetricValue style={{ color: '#cc7700' }}>{contactedLeads}</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricTitle>Need to Call</MetricTitle>
          <MetricValue style={{ color: '#cc0000' }}>{needToCallLeads}</MetricValue>
        </MetricCard>
        <MetricCard>
          <MetricTitle>Converted</MetricTitle>
          <MetricValue style={{ color: '#008000' }}>{customers}</MetricValue>
        </MetricCard>
      </MetricsRow>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <TabContainer style={{ marginBottom: 0, border: 'none', padding: 0 }}>
          <Tab $active={activeTab === 'All'} onClick={() => setActiveTab('All')}>All Leads</Tab>
          <Tab $active={activeTab === 'New'} onClick={() => setActiveTab('New')}>New</Tab>
          <Tab $active={activeTab === 'Contacted'} onClick={() => setActiveTab('Contacted')}>Contacted</Tab>
          <Tab $active={activeTab === 'Need to call again'} onClick={() => setActiveTab('Need to call again')}>Need to call again</Tab>
          <Tab $active={activeTab === 'Turned as customer'} onClick={() => setActiveTab('Turned as customer')}>Turned as customer</Tab>
        </TabContainer>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--universal-font-medium)' }}>
            {selectedPhones.size} selected
          </div>
          <Button 
            primary 
            disabled={selectedPhones.size === 0}
            onClick={() => openMessageModal(Array.from(selectedPhones))}
          >
            Send Broadcast Message
          </Button>
        </div>
      </div>

      <TableContainer>
        <Table>
          <thead>
            <tr>
              <Th>
                <input 
                  type="checkbox" 
                  checked={selectedPhones.size === filteredLeads.length && filteredLeads.length > 0} 
                  onChange={(e) => {
                    if (e.target.checked) setSelectedPhones(new Set(filteredLeads.map(l => l.phone)));
                    else setSelectedPhones(new Set());
                  }} 
                />
              </Th>
              <Th>Date</Th>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>City / PinCode</Th>
              <Th>Property Type</Th>
              <Th>Source</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr key={lead._id + lead.source}>
                <Td>
                  <input 
                    type="checkbox" 
                    checked={selectedPhones.has(lead.phone)} 
                    onChange={() => toggleSelect(lead.phone)}
                  />
                </Td>
                <Td>{new Date(lead.createdAt).toLocaleDateString()}</Td>
                <Td style={{ fontWeight: 600 }}>{lead.name || 'Unknown'}</Td>
                <Td>+91 {lead.phone}</Td>
                <Td>{lead.city || lead.pinCode || '-'}</Td>
                <Td>{lead.propertyType ? `${lead.propertyType} ${lead.purpose ? `(${lead.purpose})` : ''}` : '-'}</Td>
                <Td style={{ textTransform: 'capitalize' }}>{lead.source.replace('_', ' ')}</Td>
                <Td>
                  <Select 
                    value={lead.status} 
                    onChange={(e) => handleStatusChange(lead._id, lead.source, e.target.value)}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Need to call again">Need to call again</option>
                    <option value="Turned as customer">Turned as customer</option>
                  </Select>
                </Td>
                <Td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <Button 
                      secondary 
                      style={{ padding: '6px 12px', fontSize: '12px', minWidth: 0 }}
                      onClick={() => openMessageModal([lead.phone])}
                    >
                      Message
                    </Button>
                    <button 
                      onClick={() => handleDeleteLead(lead._id, lead.source)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '6px' }}
                      title="Delete Lead"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D50F25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <Td colSpan={10} style={{ textAlign: 'center', padding: '40px' }}>No leads found in this category.</Td>
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>

      {/* Message Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <h2 style={{ fontFamily: 'var(--universal-font-bold)', marginBottom: '8px' }}>Send Message</h2>
            <p style={{ fontFamily: 'var(--universal-font)', color: '#666', fontSize: '14px' }}>
              Sending to {targetPhones.length} recipient(s).
            </p>
            
            <div style={{ marginTop: 24 }}>
              <div style={{ fontFamily: 'var(--universal-font-medium)', fontSize: '14px', color: '#444' }}>Channel:</div>
              <RadioGroup>
                <RadioLabel>
                  <input type="radio" name="channel" value="whatsapp" checked={messageChannel === 'whatsapp'} onChange={() => setMessageChannel('whatsapp')} />
                  WhatsApp
                </RadioLabel>
                <RadioLabel>
                  <input type="radio" name="channel" value="sms" checked={messageChannel === 'sms'} onChange={() => setMessageChannel('sms')} />
                  SMS
                </RadioLabel>
              </RadioGroup>
            </div>

            <TextArea 
              placeholder="Type your message here..."
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
            />
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button secondary onClick={() => setIsModalOpen(false)} disabled={isSending}>Cancel</Button>
              <Button primary onClick={handleSendMessage} disabled={isSending}>
                {isSending ? 'Sending...' : 'Send Message'}
              </Button>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}

    </DashboardContainer>
  );
}
