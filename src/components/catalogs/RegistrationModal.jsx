'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
export default function RegistrationModal({ isOpen, onClose, onSuccess }) {
  const [step, setStep] = useState(1); // 1: Form, 2: OTP
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
  const [otp, setOtp] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      toast.error('Enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/catalogs/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'send', ...formData })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP');
      
      toast.success('OTP sent successfully!');
      setStep(2);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast.error('Enter a valid OTP');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/catalogs/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', phone: formData.phone, otp, name: formData.name, email: formData.email })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Invalid OTP');
      
      toast.success('Verified successfully!');
      onSuccess(formData.phone);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 m-4 shadow-2xl relative animate-in fade-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition"
        >
          ✕
        </button>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Unlock Full Catalog
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Please verify your details to get exclusive access to our premium design catalogs.
        </p>

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-gray-500">+91</span>
                <input 
                  type="tel" 
                  required
                  maxLength={10}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                  value={formData.phone}
                  onChange={e => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-70 mt-2"
            >
              {loading ? 'Sending OTP...' : 'Get OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
             <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Enter OTP sent to +91 {formData.phone}</label>
              <input 
                type="text" 
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none text-center tracking-[0.5em] text-lg font-semibold"
                value={otp}
                onChange={e => setOtp(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
            </div>
            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition disabled:opacity-70 mt-2"
            >
              {loading ? 'Verifying...' : 'Unlock Catalog'}
            </button>
            <button 
              type="button" 
              onClick={() => setStep(1)}
              className="w-full text-gray-500 text-sm hover:text-gray-800 transition"
            >
              Change Phone Number
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
