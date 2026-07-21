"use client";
import React, { useState } from 'react';
import BriefQuoteTemplate from '@/components/admin/quotations/BriefQuoteTemplate';
import DetailedQuoteTemplate from '@/components/admin/quotations/DetailedQuoteTemplate';

const sampleNormalData = {
  clientName: "Mr. Ravindran - Mrs. Karpagam",
  siteAddress: "Villa 11, Sathyam Builders, Ponmar, Chennai",
  contact: "98403 00603",
  date: "06th Jul 2026",
  discussedDate: "06th Jul 2026",
  finishType: "Plywood with Laminate Finish",
  discount: "10",
  sections: [
    {
      name: "Kitchen and Pooja Box Area - Wood Work - A",
      items: [
        { detail: "Kitchen Bottom", height: "3", width: "16", units: "1", totalArea: "48" },
        { detail: "Kitchen wall Box", height: "2.6", width: "16", units: "1", totalArea: "41.6" },
        { detail: "Pooja Unit (Inner Folding Door)", height: "8", width: "3", units: "1", totalArea: "24" }
      ]
    },
    {
      name: "GF & FF Bedroom Wardrobe's - Wood work - B",
      items: [
        { detail: "GF Bedroom Wardrobe", height: "9", width: "3.5", units: "1", totalArea: "31.5" },
        { detail: "MBR Wardrobe ( Inner )", height: "9", width: "3.5", units: "1", totalArea: "31.5" },
        { detail: "Master bedroom wardrobe", height: "7", width: "6.5", units: "1", totalArea: "45.5" },
        { detail: "SBR Wardrobe", height: "7", width: "4", units: "1", totalArea: "28" }
      ]
    }
  ],
  amountDetails: [
    { detail: "Total area - Kitchen Box Area - Wood Work - A", totalArea: "113", rate: "1500", totalAmount: "169500" },
    { detail: "Total area - Wardrobe Box Work - Wood Work - B", totalArea: "136", rate: "1400", totalAmount: "190400" },
    { detail: "Kitchen Accessories - 9 nos", totalArea: "9", rate: "5600", totalAmount: "50400" },
    { detail: "Electrical Work - Wood work", totalArea: "1", rate: "42000", totalAmount: "42000" }
  ],
  materials: [
    { spec: "Plywood - 19mm, 16mm & 9mm Thickness - BWP 710 Marine & MR Grade", brand: "Evergreen, Century, Kitply" },
    { spec: "Laminate - 1mm & 0.8mm Thickness", brand: "Virgo Lam, Greenlam, Merino Lam" },
    { spec: "Fittings And Accessories", brand: "Sleek, Ebco" }
  ],
  accessories: "Kitchen Accessories - 4\" Tandem Cutlery Unit 1No, 8\" Tandem Plain Basket 2 nos"
};

const sampleCorporateData = {
  clientName: "Mr. Bala Shanmugam",
  siteAddress: "FLAT Mogappair, 600042, Chennai",
  contact: "9382582629",
  email: "BLA3@GMAIL.COM",
  date: "10/04/2026",
  quoteNumber: "UI/2026/QT/084",
  validity: "30 Days",
  projectName: "3 BHK Interior Renovation",
  designer: "Dhanesh P",
  roomSections: [
    {
      roomName: "LIVING AND DINING ROOM",
      items: [
        { itemName: "TV display unit", itemDescription: "Fabrication & fixing of cabinet with aluminium profile & bronze mirror shutter", finish: "Bronze mirror", materialOrigin: "D-HFB", unit: "SCM", sizeL: "330.00", sizeB: "30.00", qty: "1", price: "46263", offerPrice: "32384" },
        { itemName: "Sofa wall panelling", itemDescription: "Providing and fixing super premium Combo panelling - Code 3337", finish: "Korea", materialOrigin: "PVC Charcoal", unit: "SCM", sizeL: "120.00", sizeB: "288.00", qty: "1", price: "", offerPrice: "19789" }
      ]
    },
    {
      roomName: "MODULAR KITCHEN",
      items: [
        { itemName: "Bottom cabinets", itemDescription: "Fabrication & fixing of cabinet in A2 Series. 100% Gurjan Plywood.", finish: "A2 series", materialOrigin: "100% Gurjan Plywood + D-HFB", unit: "SCM", sizeL: "525.00", sizeB: "83.00", qty: "1", price: "215064", offerPrice: "150545" },
        { itemName: "Premium Innoplus cutlery tray", itemDescription: "With soft close atira drawer and anti skid mat", finish: "Anthracite", materialOrigin: "Hettich, Germany", unit: "No", sizeL: "900", sizeB: "470", qty: "1", price: "", offerPrice: "18502" }
      ]
    }
  ]
};

export default function QuotationPreviewPage() {
  const [template, setTemplate] = useState('corporate');

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="print:hidden w-full bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 z-50">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Quotation Templates Preview</h1>
          <p className="text-sm text-gray-500">Press Ctrl+P to preview/save as PDF.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setTemplate('normal')} className={`px-4 py-2 rounded font-semibold transition-colors ${template === 'normal' ? 'bg-[#5485EE] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Normal (Area-based)
          </button>
          <button onClick={() => setTemplate('corporate')} className={`px-4 py-2 rounded font-semibold transition-colors ${template === 'corporate' ? 'bg-[#D50F25] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            Corporate (Detailed)
          </button>
          <button onClick={() => window.print()} className="px-6 py-2 bg-gray-800 text-white rounded font-bold hover:bg-black transition-colors ml-4">
            Print PDF
          </button>
        </div>
      </div>

      <div className="pt-24 pb-12 flex justify-center w-full print:pt-0 print:pb-0">
        <div className="shadow-2xl print:shadow-none bg-white">
          {template === 'normal'
            ? <BriefQuoteTemplate data={sampleNormalData} />
            : <DetailedQuoteTemplate data={sampleCorporateData} />}
        </div>
      </div>
    </div>
  );
}
