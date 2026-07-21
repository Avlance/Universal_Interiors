"use client";
import React from 'react';

const BriefQuoteTemplate = ({ data = {} }) => {
  const {
    clientName = "Mr. Client Name",
    siteAddress = "Site Address, Chennai",
    contact = "98403 00603",
    email = "",
    date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    discussedDate = "",
    finishType = "Plywood with Laminate Finish",
    sections = [],
    amountDetails = [],
    materials = [],
    accessories = "",
    terms = [],
    discount = 10
  } = data;

  // Calculate grand total from amount details
  const totalAmount = amountDetails.reduce((sum, a) => sum + (Number(a.totalAmount) || 0), 0);
  const discountAmount = Math.round(totalAmount * (Number(discount) / 100));
  const finalPrice = totalAmount - discountAmount;

  return (
    <div id="quotation-pdf-content" className="w-full bg-white text-black mx-auto font-sans" style={{ maxWidth: '210mm', minHeight: '297mm', fontSize: '10px' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; background-color: white !important; margin: 0; }
          @page { size: A4; margin: 10mm; }
          .print-break-inside-avoid { break-inside: avoid; }
        }
        .brief-table { width: 100%; border-collapse: collapse; }
        .brief-table th, .brief-table td { border: 1.5px solid #222; padding: 5px 8px; }
        .brief-table th { background: #f5f5f5; font-weight: 700; }
        .section-header { background: #e8f0fe !important; color: #1a56db; font-weight: 700; text-align: center; }
        .section-total { color: #1a56db; font-weight: 700; }
      `}} />

      <div className="w-full bg-white px-6 pt-0 pb-6" style={{ minHeight: '297mm', display: 'flex', flexDirection: 'column' }}>
        
        {/* Top Color Bar */}
        <div className="w-full h-2 flex mb-4">
          <div className="w-3/4 bg-[#D50F25]"></div>
          <div className="w-1/4 bg-[#FAC73D]"></div>
        </div>

        {/* Company Header */}
        <div style={{ border: '2px solid #222', marginBottom: '12px' }}>
          <div style={{ textAlign: 'center', padding: '10px 0', borderBottom: '2px solid #222' }}>
            <h1 style={{ margin: 0, fontSize: '22px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>Universal Interiors</h1>
            <p style={{ margin: '2px 0 0', fontSize: '10px', color: '#555' }}>No.180, Medavakkam Main Road, Adambakkam, Chennai 88.</p>
          </div>
          <div style={{ display: 'flex', borderBottom: '2px solid #222' }}>
            <div style={{ width: '50%', padding: '4px 8px', borderRight: '2px solid #222', fontWeight: 600, fontSize: '10px' }}>Contact: {contact}</div>
            <div style={{ width: '50%', padding: '4px 8px', fontWeight: 600, fontSize: '10px', textAlign: 'right' }}>Date : {date}</div>
          </div>
          <div style={{ padding: '4px 8px', borderBottom: '2px solid #222', fontWeight: 600, fontSize: '10px' }}>
            To, {clientName}, {siteAddress}
          </div>
          <div style={{ padding: '4px 8px', textAlign: 'center', fontSize: '10px', fontWeight: 600, background: '#fafafa' }}>
            We had discussed with you on {discussedDate || date}
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', fontWeight: 700, color: '#1a56db', marginBottom: '10px', fontSize: '13px' }}>
          Updated Quotation - {finishType}
        </div>

        {/* Sections Tables */}
        {sections.map((section, sIdx) => (
          <div key={sIdx} style={{ marginBottom: '10px' }} className="print-break-inside-avoid">
            <table className="brief-table">
              <thead>
                {sIdx === 0 && (
                  <tr>
                    <th style={{ textAlign: 'left', width: '45%' }}>Details</th>
                    <th style={{ textAlign: 'center' }}>Height</th>
                    <th style={{ textAlign: 'center' }}>Width</th>
                    <th style={{ textAlign: 'center' }}>No. of Unit</th>
                    <th style={{ textAlign: 'center' }}>Total Area</th>
                  </tr>
                )}
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="section-header">{section.name}</td>
                </tr>
                {(section.items || []).map((item, iIdx) => (
                  <tr key={iIdx}>
                    <td style={{ fontWeight: 600 }}>{iIdx + 1}. {item.detail}</td>
                    <td style={{ textAlign: 'center' }}>{item.height}</td>
                    <td style={{ textAlign: 'center' }}>{item.width}</td>
                    <td style={{ textAlign: 'center' }}>{item.units}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{item.totalArea}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="section-total" style={{ textAlign: 'left' }}>Total area - {section.name}</td>
                  <td className="section-total" style={{ textAlign: 'center' }}>
                    {(section.items || []).reduce((sum, i) => sum + (Number(i.totalArea) || 0), 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}

        {/* Amount Details Table */}
        <div style={{ marginBottom: '10px' }} className="print-break-inside-avoid">
          <table className="brief-table">
            <thead>
              <tr>
                <th colSpan="4" className="section-header" style={{ fontSize: '12px' }}>Amount Details</th>
              </tr>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ textAlign: 'left', width: '45%' }}>Details</th>
                <th style={{ textAlign: 'center' }}>Total Area</th>
                <th style={{ textAlign: 'center' }}>Rate</th>
                <th style={{ textAlign: 'center', color: '#1a56db' }}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {amountDetails.map((ad, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{ad.detail}</td>
                  <td style={{ textAlign: 'center' }}>{ad.totalArea}</td>
                  <td style={{ textAlign: 'center' }}>{ad.rate}</td>
                  <td style={{ textAlign: 'center', fontWeight: 700, color: '#1a56db' }}>{Number(ad.totalAmount).toLocaleString('en-IN')}</td>
                </tr>
              ))}
              <tr style={{ background: '#f5f5f5' }}>
                <td colSpan="3" style={{ fontWeight: 700, color: '#1a56db' }}>Total Amount</td>
                <td style={{ textAlign: 'center', fontWeight: 700, color: '#1a56db' }}>{totalAmount.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td colSpan="2" style={{ fontWeight: 700, color: '#1a56db' }}>Less: Spl. Discount {discount} %</td>
                <td style={{ textAlign: 'center', fontWeight: 700, color: '#1a56db' }}>{discount}</td>
                <td style={{ textAlign: 'center', fontWeight: 700, color: '#1a56db' }}>{discountAmount.toLocaleString('en-IN')}</td>
              </tr>
              <tr style={{ background: '#f0f0f0' }}>
                <td colSpan="3" style={{ fontWeight: 800, color: '#1a56db', fontSize: '13px' }}>Final and Best Offer Price</td>
                <td style={{ textAlign: 'center', fontWeight: 800, color: '#1a56db', fontSize: '13px' }}>{finalPrice.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Note */}
        <div style={{ textAlign: 'center', fontWeight: 600, color: '#1a56db', fontSize: '9px', marginBottom: '10px', padding: '0 20px' }}>
          Note: We have quoted the rate considering the nature of work and also the quantum of material utilized.
        </div>

        {/* Material Specification Table */}
        {materials.length > 0 && (
          <div style={{ marginBottom: '10px' }} className="print-break-inside-avoid">
            <table className="brief-table">
              <thead>
                <tr style={{ background: '#f5f5f5' }}>
                  <th style={{ textAlign: 'left', width: '55%' }}>Material Specification</th>
                  <th style={{ textAlign: 'center' }}>Brand</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((m, idx) => (
                  <tr key={idx}>
                    <td style={{ fontWeight: 600 }}>{idx + 1}. {m.spec}</td>
                    <td style={{ textAlign: 'center', fontWeight: 700 }}>{m.brand}</td>
                  </tr>
                ))}
                {accessories && (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', fontWeight: 700, color: '#1a56db', fontSize: '9px' }}>
                      {accessories}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="print-break-inside-avoid">
          <table className="brief-table">
            <thead>
              <tr>
                <th style={{ textAlign: 'center', textDecoration: 'underline', background: '#f5f5f5' }}>Terms & Conditions</th>
              </tr>
            </thead>
            <tbody>
              {(terms.length > 0 ? terms : [
                { text: "Laminate: Merino or Greenlam or Virgo (Regular Finish) and High Glass Laminates, Pattern finish - additional cost will be charging.", highlight: true },
                { text: "Payment Terms: 60% advance along with order, 30% of payment after delivery of materials, balance 10% of payment handing over the site." },
                { text: "Time Period: From the receipt of advance date to 45 working days." },
                { text: "Taxes: GST will be extra on above prices. ( As Discussed )", highlight: true },
                { text: "Civil Work, Plumbing & Electrical Works will be charged Extra." },
                { text: "Any additions and deletions in the work will alter the value accordingly." },
                { text: "Final invoice will be made based on the actual scope of work completed." },
                { text: "Expecting your approval to start the work at the earliest." }
              ]).map((t, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600, textAlign: 'center', color: t.highlight ? '#1a56db' : '#222', fontSize: '9px' }}>{t.text}</td>
                </tr>
              ))}
              <tr>
                <td style={{ fontWeight: 700, padding: '8px' }}>
                  For Universal Interiors,<br/>Mobile: {contact}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid #ddd', display: 'flex', justifyContent: 'space-between', color: '#999', fontSize: '9px' }}>
          <span>Universal Interiors | 180, 144, Medavakkam Main Rd, Chennai - 600088 | Phone: +91 94444 03550</span>
        </div>
      </div>
    </div>
  );
};

export default BriefQuoteTemplate;
