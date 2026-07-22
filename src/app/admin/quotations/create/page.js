"use client";
import React, { useState, useEffect } from 'react';
import DetailedQuoteTemplate from '@/components/admin/quotations/DetailedQuoteTemplate';
import BriefQuoteTemplate from '@/components/admin/quotations/BriefQuoteTemplate';

const UNITS = DetailedQuoteTemplate.UNITS || ['SCM', 'RCM', 'Nos', 'No', 'Sq.Ft.', 'Rft.', 'Mtr', 'Set', 'SFT', 'Kg'];

// Shared styled input
const Input = ({ label, ...props }) => (
  <div>
    {label && <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6b7280', marginBottom: '3px' }}>{label}</label>}
    <input {...props} style={{ width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', transition: 'border 0.2s', outline: 'none', background: '#fff', ...props.style }} onFocus={e => e.target.style.borderColor = '#D50F25'} onBlur={e => e.target.style.borderColor = '#d1d5db'} />
  </div>
);

export default function QuotationMaker() {
  const [mounted, setMounted] = useState(false);
  const [templateType, setTemplateType] = useState('corporate');
  const [leads, setLeads] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState('');
  const [selectedLeadSource, setSelectedLeadSource] = useState('quote_estimation');
  const [loading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // --- NORMAL ---
  const [normalData, setNormalData] = useState({
    clientName: '', siteAddress: '', contact: '', email: '', date: '', discussedDate: '',
    finishType: 'Plywood with Laminate Finish', discount: '10',
    sections: [], amountDetails: [],
    materials: [
      { spec: 'Plywood - 19mm, 16mm & 9mm Thickness - BWP 710 Marine & MR Grade', brand: 'Evergreen, Century, Kitply' },
      { spec: 'Laminate - 1mm & 0.8mm Thickness', brand: 'Virgo Lam, Greenlam, Merino Lam' },
      { spec: 'Fittings And Accessories', brand: 'Sleek, Ebco' },
      { spec: 'Adhesive', brand: 'Fevicol, Araldite' },
      { spec: 'Kitchen Accessories', brand: 'Sleek - Tandem Baskets' }
    ],
    accessories: ''
  });

  // --- CORPORATE ---
  const [corporateData, setCorporateData] = useState({
    clientName: '', siteAddress: '', contact: '', email: '', date: '',
    quoteNumber: '', validityDays: 30, projectName: 'Interior Renovation', designer: '', enableOfferPrice: true,
    roomSections: []
  });

  useEffect(() => {
    const fetchLeads = async () => {
      try { 
        const res = await fetch('/api/admin/leads?source=quote_estimation'); 
        if (res.ok) { 
          const data = await res.json(); 
          setLeads(data.leads || []); 
          
          // Check for edit mode
          const params = new URLSearchParams(window.location.search);
          const editLeadId = params.get('leadId');
          const editDocId = params.get('docId');
          
          if (editLeadId && editDocId) {
            const lead = data.leads.find(l => l._id === editLeadId);
            if (lead && lead.documents) {
              const doc = lead.documents.find(d => d.id === editDocId);
              if (doc && doc.quotationData) {
                setSelectedLeadId(editLeadId);
                setSelectedLeadSource(lead.source || 'quote_estimation');
                setTemplateType(doc.templateType || 'corporate');
                if (doc.templateType === 'normal') setNormalData(doc.quotationData);
                else setCorporateData(doc.quotationData);
              }
            }
          }
        } 
      } catch (err) { console.error(err); }
      finally { setMounted(true); }
    };
    fetchLeads();
  }, []);

  const handleLeadSelect = (e) => {
    const id = e.target.value; setSelectedLeadId(id);
    const lead = leads.find(l => l._id === id);
    if (lead) {
      setSelectedLeadSource(lead.source || 'quote_estimation');
      const shared = { clientName: lead.name || '', contact: lead.phone || '', email: lead.email || '', siteAddress: lead.address || '' };
      setNormalData(p => ({ ...p, ...shared }));
      setCorporateData(p => ({ ...p, ...shared }));
    }
  };

  // NORMAL handlers
  const addSection = () => setNormalData(p => ({ ...p, sections: [...p.sections, { name: '', items: [] }] }));
  const removeSection = (s) => setNormalData(p => ({ ...p, sections: p.sections.filter((_, i) => i !== s) }));
  const addSectionItem = (s) => { setNormalData(p => { const ss = [...p.sections]; ss[s] = { ...ss[s], items: [...ss[s].items, { detail: '', height: '', width: '', units: '1', totalArea: '' }] }; return { ...p, sections: ss }; }); };
  const removeSectionItem = (s, i) => { setNormalData(p => { const ss = [...p.sections]; ss[s] = { ...ss[s], items: ss[s].items.filter((_, x) => x !== i) }; return { ...p, sections: ss }; }); };
  const handleSectionItemChange = (s, i, f, v) => { setNormalData(p => { const ss = [...p.sections]; const it = [...ss[s].items]; it[i] = { ...it[i], [f]: v }; if (['height','width','units'].includes(f)) it[i].totalArea = (Number(it[i].height||0)*Number(it[i].width||0)*Number(it[i].units||1)).toString(); ss[s] = { ...ss[s], items: it }; return { ...p, sections: ss }; }); };
  const addAmountDetail = () => setNormalData(p => ({ ...p, amountDetails: [...p.amountDetails, { detail: '', totalArea: '', rate: '', totalAmount: '' }] }));
  const removeAmountDetail = (i) => setNormalData(p => ({ ...p, amountDetails: p.amountDetails.filter((_, x) => x !== i) }));
  const handleAmountDetailChange = (i, f, v) => { setNormalData(p => { const a = [...p.amountDetails]; a[i] = { ...a[i], [f]: v }; if (['totalArea','rate'].includes(f)) a[i].totalAmount = (Number(a[i].totalArea||0)*Number(a[i].rate||0)).toString(); return { ...p, amountDetails: a }; }); };

  // CORPORATE handlers
  const addRoom = () => setCorporateData(p => ({ ...p, roomSections: [...p.roomSections, { roomName: '', items: [] }] }));
  const removeRoom = (r) => setCorporateData(p => ({ ...p, roomSections: p.roomSections.filter((_, i) => i !== r) }));
  const addRoomItem = (r) => { setCorporateData(p => { const rs = [...p.roomSections]; rs[r] = { ...rs[r], items: [...rs[r].items, { itemName: '', itemDescription: '', finish: '', materialOrigin: '', unit: 'SCM', sizeL: '', sizeB: '', qty: '1', price: '', offerPrice: '' }] }; return { ...p, roomSections: rs }; }); };
  const removeRoomItem = (r, i) => { setCorporateData(p => { const rs = [...p.roomSections]; rs[r] = { ...rs[r], items: rs[r].items.filter((_, x) => x !== i) }; return { ...p, roomSections: rs }; }); };
  const handleRoomItemChange = (r, i, f, v) => { setCorporateData(p => { const rs = [...p.roomSections]; const it = [...rs[r].items]; it[i] = { ...it[i], [f]: v }; rs[r] = { ...rs[r], items: it }; return { ...p, roomSections: rs }; }); };

  // PDF + Send
  const generatePDFAndSend = async () => {
    if (!selectedLeadId) { alert("Please select a lead first!"); return; }
    setIsLoading(true); setMessage('Generating PDF...');
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const el = document.getElementById('quotation-pdf-content');
      const cn = templateType === 'normal' ? normalData.clientName : corporateData.clientName;
      const ph = templateType === 'normal' ? normalData.contact : corporateData.contact;
      const opt = { margin: 0, filename: `Quotation_${cn.replace(/\s+/g,'_')}.pdf`, image: { type:'jpeg', quality:0.98 }, html2canvas: { scale:2, useCORS:true }, jsPDF: { unit:'mm', format:'a4', orientation:'portrait' } };
      const blob = await html2pdf().from(el).set(opt).output('blob');
      setMessage('Uploading PDF...');
      const form = new FormData(); form.append('file', blob, opt.filename);
      const ur = await fetch('/api/upload', { method:'POST', body:form });
      const ud = await ur.json(); if (!ur.ok) throw new Error(ud.message || 'Upload failed');
      const pdfUrl = ud.data.url;
      const cd = templateType === 'normal' ? normalData : corporateData;
      setMessage('Saving to customer record...');
      const resDoc = await fetch(`/api/admin/leads/${selectedLeadId}?source=${selectedLeadSource}&action=document`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ name:opt.filename, url:pdfUrl, type:'pdf', notes:`Generated ${templateType} quotation`, templateType, quotationData: cd }) });
      if (!resDoc.ok) {
        const docErr = await resDoc.json();
        throw new Error(docErr.error || 'Failed to save document to lead record.');
      }
      
      setMessage('Sending via WhatsApp...');
      const resMsg = await fetch('/api/admin/send-message', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ phones:[ph], message:`Hello ${cn}, here is your quotation from Universal Interiors.`, documentUrl:pdfUrl }) });
      
      const msgData = await resMsg.json();
      if (!resMsg.ok) {
        throw new Error(msgData.error || 'Failed to trigger WhatsApp message.');
      }
      
      if (msgData.results && msgData.results.failed > 0) {
        throw new Error(msgData.results.errors?.[0]?.error || 'WhatsApp API failed to send the message.');
      }

      setMessage('✅ Success! PDF saved and sent via WhatsApp.');
    } catch (err) { console.error(err); setMessage(`❌ Error: ${err.message}`); } finally { setIsLoading(false); }
  };

  const downloadPDF = async () => {
    setIsLoading(true); setMessage('Preparing Download...');
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      const el = document.getElementById('quotation-pdf-content');
      const cn = templateType === 'normal' ? normalData.clientName : corporateData.clientName;
      const opt = { margin: 0, filename: `Quotation_${(cn || 'Draft').replace(/\s+/g,'_')}.pdf`, image: { type:'jpeg', quality:0.98 }, html2canvas: { scale:2, useCORS:true }, jsPDF: { unit:'mm', format:'a4', orientation:'portrait' } };
      await html2pdf().from(el).set(opt).save();
      setMessage('✅ Downloaded successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) { 
      console.error(err); setMessage(`❌ Error: ${err.message}`); 
    } finally { 
      setIsLoading(false); 
    }
  };

  const cd = templateType === 'normal' ? normalData : corporateData;
  const setF = (f, v) => { if (templateType === 'normal') setNormalData(p => ({ ...p, [f]: v })); else setCorporateData(p => ({ ...p, [f]: v })); };

  if (!mounted) {
    return (
      <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: '#666', fontSize: '14px' }}>
        Loading Quotation Maker...
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f3f4f6', display: 'flex' }}>
      {/* ============ LEFT PANEL ============ */}
      <div style={{ width: '440px', background: '#fff', borderRight: '1px solid #e5e7eb', overflowY: 'auto', maxHeight: '100vh' }}>
        <div style={{ padding: '20px 24px' }}>
          
          {/* Title & Back */}
          <div style={{ marginBottom: '24px' }}>
            <a href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 14px', background: '#f3f4f6', color: '#374151', borderRadius: '8px', fontSize: '12px', fontWeight: 700, textDecoration: 'none', marginBottom: '20px', border: '1px solid #d1d5db', transition: 'all 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }} onMouseOver={e => e.currentTarget.style.background='#e5e7eb'} onMouseOut={e => e.currentTarget.style.background='#f3f4f6'}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              Back to Admin Dashboard
            </a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'linear-gradient(135deg, #D50F25, #b50d1f)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: '18px', boxShadow: '0 4px 10px rgba(213,15,37,0.2)' }}>Q</div>
              <h2 style={{ margin: 0, fontSize: '22px', fontWeight: 800, color: '#111', letterSpacing: '-0.5px' }}>Quotation Maker</h2>
            </div>
          </div>

          {message && <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 600, background: message.includes('✅') ? '#ecfdf5' : message.includes('❌') ? '#fef2f2' : '#eff6ff', color: message.includes('✅') ? '#065f46' : message.includes('❌') ? '#991b1b' : '#1e40af' }}>{message}</div>}

          {/* Template Toggle */}
          <div style={{ display: 'flex', gap: '8px', margin: '16px 0', background: '#f3f4f6', borderRadius: '10px', padding: '4px' }}>
            {[['corporate', '🏢 Corporate'], ['normal', '📐 Normal (Area)']].map(([key, label]) => (
              <button key={key} onClick={() => setTemplateType(key)} style={{
                flex: 1, padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '12px', transition: 'all 0.2s',
                background: templateType === key ? (key === 'corporate' ? 'linear-gradient(135deg, #D50F25, #b50d1f)' : '#5485EE') : 'transparent',
                color: templateType === key ? '#fff' : '#666',
                boxShadow: templateType === key ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
              }}>{label}</button>
            ))}
          </div>

          {/* Lead Select */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6b7280', marginBottom: '3px' }}>Select Customer / Lead</label>
            <select value={selectedLeadId} onChange={handleLeadSelect} style={{ width: '100%', padding: '9px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '13px', background: '#fff' }}>
              <option value="">-- Select a Customer --</option>
              {leads.map(l => <option key={l._id} value={l._id}>{l.name} ({l.phone})</option>)}
            </select>
          </div>

          {/* Section: Client */}
          <div style={{ background: '#fafbfc', borderRadius: '10px', padding: '14px 16px', marginBottom: '14px', border: '1px solid #f0f0f0' }}>
            <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#D50F25', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>1</span>
              Client Information
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ gridColumn: 'span 2' }}><Input label="Client Name" placeholder="Mr. / Mrs." value={cd.clientName} onChange={e => setF('clientName', e.target.value)} /></div>
              <Input label="Phone" placeholder="+91..." value={cd.contact} onChange={e => setF('contact', e.target.value)} />
              <Input label="Email" placeholder="email@example.com" value={cd.email} onChange={e => setF('email', e.target.value)} />
              <div style={{ gridColumn: 'span 2' }}><Input label="Site Address" placeholder="Full address" value={cd.siteAddress} onChange={e => setF('siteAddress', e.target.value)} /></div>
            </div>
          </div>

          {/* ====== CORPORATE FORM ====== */}
          {templateType === 'corporate' && (
            <>
              {/* Project Info */}
              <div style={{ background: '#fafbfc', borderRadius: '10px', padding: '14px 16px', marginBottom: '14px', border: '1px solid #f0f0f0' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#F5B400', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>2</span>
                  Project Information
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <Input label="Project Name" value={corporateData.projectName} onChange={e => setCorporateData({ ...corporateData, projectName: e.target.value })} />
                  <Input label="Designer" placeholder="Optional" value={corporateData.designer} onChange={e => setCorporateData({ ...corporateData, designer: e.target.value })} />
                  <Input label="Validity (Days)" type="number" value={corporateData.validityDays} onChange={e => setCorporateData({ ...corporateData, validityDays: e.target.value })} />
                  <Input label="Date" type="date" value={corporateData.date} onChange={e => setCorporateData({ ...corporateData, date: e.target.value })} />
                  <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <input type="checkbox" id="offerPriceToggle" checked={corporateData.enableOfferPrice} onChange={e => setCorporateData({ ...corporateData, enableOfferPrice: e.target.checked })} style={{ accentColor: '#D50F25', cursor: 'pointer' }} />
                    <label htmlFor="offerPriceToggle" style={{ fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>Enable Offer Price Column</label>
                  </div>
                </div>
              </div>

              {/* Room Sections */}
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#5485EE', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>3</span>
                Room Sections & Items
              </div>

              {corporateData.roomSections.map((room, rIdx) => (
                <div key={rIdx} style={{ marginBottom: '12px', background: '#fafbfc', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                  {/* Room header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#f0f4f8', borderBottom: '1px solid #e5e7eb' }}>
                    <input value={room.roomName} onChange={e => { const r = [...corporateData.roomSections]; r[rIdx] = { ...r[rIdx], roomName: e.target.value }; setCorporateData({ ...corporateData, roomSections: r }); }} placeholder="Room Name (e.g. LIVING AND DINING)" style={{ flex: 1, padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' }} />
                    <button onClick={() => removeRoom(rIdx)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '5px', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 700, fontSize: '14px' }}>×</button>
                  </div>
                  
                  {/* Items */}
                  <div style={{ padding: '10px 14px' }}>
                    {room.items.map((item, iIdx) => (
                      <div key={iIdx} style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '12px', marginBottom: '8px', position: 'relative' }}>
                        <button onClick={() => removeRoomItem(rIdx, iIdx)} style={{ position: 'absolute', top: '6px', right: '6px', background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '16px', fontWeight: 700, lineHeight: 1 }}>×</button>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '12px' }}>
                          <Input label="Item Name" value={item.itemName} onChange={e => handleRoomItemChange(rIdx, iIdx, 'itemName', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px' }} />
                          <Input label="Finish / Brand" value={item.finish} onChange={e => handleRoomItemChange(rIdx, iIdx, 'finish', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px' }} />
                          <div style={{ gridColumn: 'span 2' }}>
                            <Input label="Description" value={item.itemDescription} onChange={e => handleRoomItemChange(rIdx, iIdx, 'itemDescription', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px' }} />
                          </div>
                          <Input label="Material / Origin" value={item.materialOrigin} onChange={e => handleRoomItemChange(rIdx, iIdx, 'materialOrigin', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px' }} />
                          <div>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#6b7280', marginBottom: '3px' }}>Unit</label>
                            <select value={item.unit} onChange={e => handleRoomItemChange(rIdx, iIdx, 'unit', e.target.value)} style={{ width: '100%', padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '12px', background: '#fff' }}>
                              {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '4px', alignItems: 'end' }}>
                            <Input label="Length" type="number" value={item.sizeL} onChange={e => handleRoomItemChange(rIdx, iIdx, 'sizeL', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px' }} />
                            <span style={{ fontSize: '14px', fontWeight: 700, color: '#aaa', paddingBottom: '8px' }}>×</span>
                            <Input label="Breadth" type="number" value={item.sizeB} onChange={e => handleRoomItemChange(rIdx, iIdx, 'sizeB', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px' }} />
                          </div>
                          <Input label="Qty" type="number" value={item.qty} onChange={e => handleRoomItemChange(rIdx, iIdx, 'qty', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px' }} />
                          <Input label="Price (₹)" type="number" value={item.price} onChange={e => handleRoomItemChange(rIdx, iIdx, 'price', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px' }} />
                          <Input label="Offer Price (₹)" type="number" value={item.offerPrice} onChange={e => handleRoomItemChange(rIdx, iIdx, 'offerPrice', e.target.value)} style={{ fontSize: '12px', padding: '6px 8px', borderColor: '#D50F25' }} />
                        </div>
                      </div>
                    ))}
                    <button onClick={() => addRoomItem(rIdx)} style={{ width: '100%', padding: '8px', background: '#eff6ff', color: '#2563eb', border: '1px dashed #93c5fd', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '11px' }}>+ Add Item</button>
                  </div>
                </div>
              ))}
              <button onClick={addRoom} style={{ width: '100%', padding: '12px', background: '#fff', color: '#6b7280', border: '2px dashed #d1d5db', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '12px', marginBottom: '16px', transition: 'all 0.2s' }}>+ Add Room Section</button>
            </>
          )}

          {/* ====== NORMAL FORM ====== */}
          {templateType === 'normal' && (
            <>
              <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#5485EE', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>2</span>
                Area Sections
              </div>
              {normalData.sections.map((section, sIdx) => (
                <div key={sIdx} style={{ marginBottom: '12px', background: '#fafbfc', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: '#f0f4f8', borderBottom: '1px solid #e5e7eb' }}>
                    <input value={section.name} onChange={e => { const s = [...normalData.sections]; s[sIdx] = { ...s[sIdx], name: e.target.value }; setNormalData({ ...normalData, sections: s }); }} placeholder="Section Name (e.g. Kitchen Box Area)" style={{ flex: 1, padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px', fontWeight: 600 }} />
                    <button onClick={() => removeSection(sIdx)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '5px', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 700 }}>×</button>
                  </div>
                  <div style={{ padding: '10px 14px' }}>
                    {/* Column headers */}
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.7fr 1fr auto', gap: '4px', fontSize: '10px', fontWeight: 600, color: '#9ca3af', marginBottom: '4px', paddingLeft: '2px' }}>
                      <span>Detail</span><span>Height</span><span>Width</span><span>Units</span><span>Area</span><span></span>
                    </div>
                    {section.items.map((item, iIdx) => (
                      <div key={iIdx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 0.7fr 1fr auto', gap: '4px', marginBottom: '4px', alignItems: 'center' }}>
                        <input value={item.detail} onChange={e => handleSectionItemChange(sIdx, iIdx, 'detail', e.target.value)} placeholder="Detail" style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px' }} />
                        <input type="number" value={item.height} onChange={e => handleSectionItemChange(sIdx, iIdx, 'height', e.target.value)} placeholder="H" style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px' }} />
                        <input type="number" value={item.width} onChange={e => handleSectionItemChange(sIdx, iIdx, 'width', e.target.value)} placeholder="W" style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px' }} />
                        <input type="number" value={item.units} onChange={e => handleSectionItemChange(sIdx, iIdx, 'units', e.target.value)} style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px' }} />
                        <span style={{ fontWeight: 700, color: '#5485EE', fontSize: '12px', paddingLeft: '4px' }}>{item.totalArea || '0'}</span>
                        <button onClick={() => removeSectionItem(sIdx, iIdx)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '14px' }}>×</button>
                      </div>
                    ))}
                    <button onClick={() => addSectionItem(sIdx)} style={{ width: '100%', padding: '6px', background: '#eff6ff', color: '#2563eb', border: '1px dashed #93c5fd', borderRadius: '5px', cursor: 'pointer', fontWeight: 600, fontSize: '11px', marginTop: '4px' }}>+ Add Item</button>
                  </div>
                </div>
              ))}
              <button onClick={addSection} style={{ width: '100%', padding: '10px', background: '#fff', color: '#6b7280', border: '2px dashed #d1d5db', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '12px', marginBottom: '14px' }}>+ Add Section</button>

              <div style={{ fontSize: '12px', fontWeight: 700, color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '20px', height: '20px', borderRadius: '4px', background: '#F5B400', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 800 }}>3</span>
                Amount Details
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '4px', fontSize: '10px', fontWeight: 600, color: '#9ca3af', marginBottom: '4px' }}>
                <span>Description</span><span>Area</span><span>Rate</span><span>Total</span><span></span>
              </div>
              {normalData.amountDetails.map((ad, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr auto', gap: '4px', marginBottom: '4px', alignItems: 'center' }}>
                  <input value={ad.detail} onChange={e => handleAmountDetailChange(idx, 'detail', e.target.value)} placeholder="Detail" style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px' }} />
                  <input type="number" value={ad.totalArea} onChange={e => handleAmountDetailChange(idx, 'totalArea', e.target.value)} placeholder="Area" style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px' }} />
                  <input type="number" value={ad.rate} onChange={e => handleAmountDetailChange(idx, 'rate', e.target.value)} placeholder="Rate" style={{ padding: '6px 8px', border: '1px solid #d1d5db', borderRadius: '5px', fontSize: '12px' }} />
                  <span style={{ fontWeight: 700, color: '#5485EE', fontSize: '12px' }}>₹{Number(ad.totalAmount||0).toLocaleString('en-IN')}</span>
                  <button onClick={() => removeAmountDetail(idx)} style={{ background: 'none', border: 'none', color: '#dc2626', cursor: 'pointer', fontSize: '14px' }}>×</button>
                </div>
              ))}
              <button onClick={addAmountDetail} style={{ width: '100%', padding: '8px', background: '#eff6ff', color: '#2563eb', border: '1px dashed #93c5fd', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '11px', marginBottom: '14px' }}>+ Add Amount Row</button>

              <Input label="Discount %" type="number" value={normalData.discount} onChange={e => setNormalData({ ...normalData, discount: e.target.value })} style={{ marginBottom: '14px' }} />
            </>
          )}

          {/* CTA */}
          <button onClick={generatePDFAndSend} disabled={loading || !selectedLeadId} style={{
            width: '100%', padding: '14px', background: loading ? '#9ca3af' : 'linear-gradient(135deg, #D50F25, #b50d1f)',
            color: '#fff', fontWeight: 700, fontSize: '14px', borderRadius: '10px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 14px rgba(213,15,37,0.3)', transition: 'all 0.2s', opacity: !selectedLeadId ? 0.5 : 1, marginBottom: '10px'
          }}>
            {loading ? '⏳ Processing...' : '🚀 Save PDF & Send via WhatsApp'}
          </button>
          
          <button onClick={downloadPDF} disabled={loading} style={{
            width: '100%', padding: '12px', background: '#fff', color: '#374151', fontWeight: 700, fontSize: '13px', 
            borderRadius: '10px', border: '2px solid #e5e7eb', cursor: loading ? 'not-allowed' : 'pointer', transition: 'all 0.2s'
          }}>
            💾 Download Local PDF Copy
          </button>
        </div>
      </div>

      {/* ============ RIGHT PANEL: LIVE PREVIEW ============ */}
      <div style={{ flex: 1, background: '#e5e7eb', overflowY: 'auto', maxHeight: '100vh', display: 'flex', justifyContent: 'center', padding: '32px' }}>
        <div style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.15)', background: '#fff', width: '210mm' }}>
          {templateType === 'normal'
            ? <BriefQuoteTemplate data={normalData} />
            : <DetailedQuoteTemplate data={corporateData} />}
        </div>
      </div>
    </div>
  );
}
